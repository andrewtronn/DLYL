using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end
{
    public class Post
    {
        [Key]
        public int post_id              { get; set; }
        public int user_id              { get; set; }
        [ForeignKey("user_id")]
        public User user                { get; set; }
        public string title             { get; set; }
        public string body              { get; set; }
        public DateTime time            { get; set; }
        public List<Comment> comments   { get; set; }

        public Post()
        {

        }

        public Post(int user, string title, string body)
        {
            this.user_id = user;
            this.title = title;
            this.body = body;
        }
    }

    

}