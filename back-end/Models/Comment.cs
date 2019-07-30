using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end
{
    public class Comment
    {
        [Key]
        public int comment_id       { get; set; }
        public string comment       { get; set; }
        public int user_id          { get; set; }
        [ForeignKey("user_id")]
        public User user            { get; set; }
        public int article_id       { get; set; }
        [ForeignKey("article_id")]
        public Article article      { get; set; }
        public DateTime time        { get; set; }

        public Comment ()
        {
    
        }

        public Comment (string comment, int user, int article, DateTime time)
        {
            this.comment = comment;
            this.user_id = user;
            this.article_id = article;
            this.time = time; 
        }
    }
}