using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end
{
    public class Forum
    {
        [Key]
        public int thread_id           { get; set; }
        public int user_id             { get; set; }
        [ForeignKey("user_id")]
        public string title            { get; set; }
        public string body             { get; set; }
        public DateTime time           { get; set; }
        public List<Comment> comments   { get; set; }

        public Forum()
        {

        }
        public Forum (int user, string title, string body, DateTime time)
        {
         this.user_id = user;
         this.title = title;
         this.body = body; 
        }
    }
}