using System;
using System.Xml;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Net.Http.Formatting;
using MailChimp;
using MailChimp.Net;
using MailChimp.Net.Core;
using MailChimp.Net.Models;
using Microsoft.Extensions.Configuration;
using System.Globalization;

namespace back_end.Controllers
{
    static class MailchimpRepository
    {
         static private IConfiguration _configuration;
        static private  string ApiKey = Keys.mailChimpApi;
        static private string ListId = Keys.listId;
        private const int TemplateId = 3293;
        static private MailChimpManager _mailChimpManager = new MailChimpManager(ApiKey);
        static private Setting _campaignSettings = new Setting
        {
            ReplyTo = "DontLoseYourLicense@gmail.com",
            FromName = "DontLoseYourLicense",
            Title = "Dont Lose Your License new article",
            SubjectLine = "New Article",
        };

        // `html` contains the content of your email using html notation
        static public void CreateAndSendCampaign(string html)
        {
            var campaign = _mailChimpManager.Campaigns.AddAsync(new Campaign
            {
                Settings = _campaignSettings,
                Recipients = new Recipient { ListId = ListId },
                Type = CampaignType.Regular
            }).Result;
            var timeStr = DateTime.Now.ToString();
            var content = _mailChimpManager.Content.AddOrUpdateAsync(
             campaign.Id,
             new ContentRequest()
             {
                 Template = new ContentTemplate
                 {
                     Id = TemplateId,
                     Sections = new Dictionary<string, object>()
                {
       { "body_content", html },
       { "preheader_leftcol_content", $"<p>{timeStr}</p>" }
                }
                 }
             }).Result;
            _mailChimpManager.Campaigns.SendAsync(campaign.Id).Wait();
        }
    }

    [Route("api/articles")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly DlylContext _context;
        public ArticleController(DlylContext context)
        {
            _context = context;
        }
        void ParseRssFile(String xml)
        {
            XmlDocument rssXmlDoc = new XmlDocument();

            // Load the RSS file from the RSS URL
            rssXmlDoc.LoadXml(xml);


            // Parse the Items in the RSS file
            XmlNodeList rssNodes = rssXmlDoc.SelectNodes("rss/channel/item");

            // Iterate through the items in the RSS file
            foreach (XmlNode rssNode in rssNodes)
            {
                //get all article data
                XmlNode rssSubNode = rssNode.SelectSingleNode("title");
                string title = rssSubNode != null ? rssSubNode.InnerText : "";

                rssSubNode = rssNode.SelectSingleNode("link");
                string link = rssSubNode != null ? rssSubNode.InnerText : "";

                rssSubNode = rssNode.SelectSingleNode("description");
                string description = rssSubNode != null ? rssSubNode.InnerText : "";

                rssSubNode = rssNode.SelectSingleNode("pubDate");
                string pubDate = rssSubNode != null ? rssSubNode.InnerText : "";

                //Articles too old? stop searching
                if ((DateTime.Now - Convert.ToDateTime(pubDate)).TotalDays > 30)
                {
                    break;
                }

                //check for relevant pages from each site, get all from ca.gov sites
                if ((title.Contains("California") || description.Contains("California") || link.Contains("ca.gov")) && (title.Contains("compliance")
                || title.Contains("regulation") || title.Contains("regulations") || title.Contains("regulated")
                || title.Contains("approve") || title.Contains("approved") || title.Contains("approves")
                || description.Contains("regulation") || description.Contains("regulations") || description.Contains("regulated")
                || description.Contains("approve") || link.Contains("ca.gov")))
                {
                    //if no matches with the database, we need to add it. 
                    // aka: (new article published from websites below)
                    if ((_context.articles.FirstOrDefault(a => a.title == title)) == null)
                    {
                        Article tempArticle = new Article(link, title, description, Convert.ToDateTime(pubDate));
                        _context.articles.Add(tempArticle);

                        //new article, send email to subscribers
                        MailchimpRepository.CreateAndSendCampaign(modifyHTML(link));
                    }
                    else
                    {
                        //we can break out of this feed because we know we have searched this far since we have an article from this source
                        break;
                    }
                }
                _context.SaveChanges();
            }
        }

        public static string modifyHTML(string link)
        {
            return "<div mc:edit=\"body_content\"><h1>&nbsp;</h1>" +
       "<h3>New Article</h3><h4>Read the latest compliance and regulation changes so you don&#39;t lose your license!</h4>" +
       "<p>Latest Article:<br><br><a id=\"articleLink\" href=\"" + link + "\"target=\"_blank\">" + link + "</a></p></div>";
        }

        async Task<string> Download(string url) // async function
        {
            string stringContent = null;
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    var byteContent = await client.GetByteArrayAsync(url);
                    stringContent = Encoding.UTF8.GetString(byteContent, 0, byteContent.Length);
                }
                catch
                {
                }
            }

            return stringContent;

        }
        void AddArticles()
        {
            List<String> links = new List<String>();
            List<Task> TaskList = new List<Task>(); // list of tasks

            links.Add("https://mjbizdaily.com/feed/");
            links.Add("https://www.cannalawblog.com/feed/");
            links.Add("https://cannabislaw.report/feed/");
            links.Add("https://cannabis.ca.gov/feed/");
            links.Add("https://420intel.com/taxonomy/term/401/feed");
            links.Add("https://www.thecannifornian.com/feed/");
            links.Add("https://www.weednews.co/feed/");

            //multiple threads for each url
            foreach (var link in links)
            {
                TaskList.Add(Download(link));
            }

            Task.WaitAll(TaskList.ToArray());

            //have xml, can now update DB
            foreach (Task<string> task in TaskList)
            {
                if (task.Result != null)
                    ParseRssFile(task.Result);
            }
            if (_context.articles != null)
            {
                //check for articles out of date, greater than 30 days and remove
                _context.articles.RemoveRange(_context.articles.Where(x => (DateTime.Now - x.time).TotalDays > 30));
                _context.SaveChanges();
            
            }
        }

        public static string StripHTML(string input)
        {
            return Regex.Replace(input, "<.*?>", String.Empty);
        }

        // GET api
        [HttpGet]
        public IActionResult Get()
        {
            //need to update articles to DB 
            AddArticles();

            foreach (var article in _context.articles)
            {
                article.summary = StripHTML(article.summary);
            }
            _context.SaveChanges();

            return Ok(_context.articles
            .Include(a => a.comments)
            .ThenInclude(a => a.user));
        }

        // POST used to add comment to a specific article
        [HttpPost]
        public IActionResult Post([FromBody] Comment c)
        {
            if (c == null)
            {
                return BadRequest();
            }

            string today =
            System.DateTime.Now.Year.ToString() + "-" +
            System.DateTime.Now.Month.ToString() + "-" +
            System.DateTime.Now.Day.ToString() + " " +
            System.DateTime.Now.Hour.ToString() + ":" +
            System.DateTime.Now.Minute.ToString() + ":" +
            System.DateTime.Now.Second.ToString();

            c.time = Convert.ToDateTime(today);
            _context.comments.Add(c);
            _context.SaveChanges();

            return Ok(_context.articles
           .Include(a => a.comments)
           .ThenInclude(a => a.user));
        }

        // DELETE api
        [HttpDelete("{article_id}/{comment_id}")]
        public ActionResult Delete(int article_id, int comment_id)
        {

            Comment comment = _context.comments.FirstOrDefault(c => c.article_id == article_id && c.comment_id == comment_id);
            _context.comments.Remove(comment);
            _context.SaveChanges();

            return Ok(_context.articles
           .Include(a => a.comments)
           .ThenInclude(a => a.user));
        }
    }
}
