using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using BCrypt.Net;
using System.Net;
using System.IO;
using System.Runtime.Serialization.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace back_end
{
    public class ValidUser
    {
        public User user { get; set; } = null;
        public string token { get; set; }
        public ValidUser() { }
        public ValidUser(string str)
        {
            this.token = str;
        }
        public ValidUser(User user, string str)
        {
            this.user = user;
            this.token = str;
        }
    }

    [Route("api/token")]
    [ApiController]
    public class TokenController : Controller
    {
        private IConfiguration _config;
        private DlylContext _context;
        public TokenController(IConfiguration config, DlylContext context)
        {
            _config = config;
            _context = context;
        }


        private string CallMailChimpApi(string method, string requestJson, string key)
        {
            var endpoint = String.Format("https://{0}.api.mailchimp.com/3.0/{1}", "us20", method);
            Console.WriteLine(endpoint);
            byte[] dataStream = Encoding.UTF8.GetBytes(requestJson);
            var responsetext = string.Empty;
            WebRequest request = HttpWebRequest.Create(endpoint);
            WebResponse response = null;
            try
            {
                request.ContentType = "application/json";
                SetBasicAuthHeader(request, "anystring", key);  // BASIC AUTH
                request.Method = "POST";
                request.ContentLength = dataStream.Length;
                Stream newstream = request.GetRequestStream();

                newstream.Write(dataStream, 0, dataStream.Length);
                newstream.Close();

                response = request.GetResponse();


                // get the result
                using (StreamReader reader = new StreamReader(response.GetResponseStream()))
                {
                    JsonSerializer json = new JsonSerializer();
                    JObject content = JObject.Parse(reader.ReadToEnd());

                    responsetext = reader.ReadToEnd();
                }

                response.Close();
            }


            catch (WebException ex)
            {

                using (var sr = new StreamReader(response.GetResponseStream()))
                {
                    responsetext = sr.ReadToEnd();
                }
            }
            return responsetext;
        }
        public void SetBasicAuthHeader(WebRequest request, string username, string password)
        {
            string auth = username + ":" + password;
            auth = Convert.ToBase64String(Encoding.Default.GetBytes(auth));
            request.Headers["Authorization"] = "Basic " + auth;
        }

        [HttpPost]
        [Route("loginUser")]
        public ActionResult GetToken([FromBody] User user)
        {
            var tempUser = _context.users.FirstOrDefault(u => u.username == user.username);
            bool validPassword = BCrypt.Net.BCrypt.Verify(user.password, tempUser.password);
            if (tempUser != null && validPassword)
            {
                string today =
            System.DateTime.Now.Year.ToString() + "-" +
            System.DateTime.Now.Month.ToString() + "-" +
            System.DateTime.Now.Day.ToString() + " " +
            System.DateTime.Now.Hour.ToString() + ":" +
            System.DateTime.Now.Minute.ToString() + ":" +
            System.DateTime.Now.Second.ToString();
                tempUser.active_date = Convert.ToDateTime(today);
                _context.SaveChanges();
                return Ok(BuildToken(tempUser));
            }
            else
            {
                return NotFound();
            }
        }
        [HttpPost]
        [Route("Register")]
        public User Register([FromBody] User user)
        {
            user.password = BCrypt.Net.BCrypt.HashPassword(user.password, SaltRevision.Revision2A);
            string today =
            System.DateTime.Now.Year.ToString() + "-" +
            System.DateTime.Now.Month.ToString() + "-" +
            System.DateTime.Now.Day.ToString() + " " +
            System.DateTime.Now.Hour.ToString() + ":" +
            System.DateTime.Now.Minute.ToString() + ":" +
            System.DateTime.Now.Second.ToString();
            user.creation_date = Convert.ToDateTime(today);

            //need to check of they subscribed to mailing system
            string[] splitAr = user.email.Split("*");

            //get rid of star for actual email
            user.email = splitAr[0];

            _context.users.Add(user);
            _context.SaveChanges();

            //if they subscribed add them to the list array will have more than 1 element
            if (splitAr.Length >1)
            {
                Console.WriteLine("Hello subscribed");
                var subscribeRequest = new
                {
                    email_address = user.email,
                    status = "subscribed"
                };
                var requestJson = JsonConvert.SerializeObject(subscribeRequest);
                Console.WriteLine(CallMailChimpApi("lists/"+Keys.listId+"/members", requestJson, Keys.mailChimpApi));
            }

            return user;
        }
        private ValidUser BuildToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: creds);
            return new ValidUser(user, new JwtSecurityTokenHandler().WriteToken(token));
        }
    }
}