using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end
{
    public class Article
    {
        [Key]
        public int article_id           { get; set; }
        public string article_link      { get; set; }
        public string title             { get; set; }
        public string summary           { get; set; }
        public DateTime time            { get; set; }
        public List<Comment> comments   { get; set; }

        public Article()
        {

        }
        public Article (string link, string title, string summary, DateTime time)
        {
            this.article_link = link;
            this.title = title;
            this.summary = summary;
            this.time = time;
        }
    }
}