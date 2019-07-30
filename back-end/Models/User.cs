using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end
{
    public class User
    {
        [Key]
        public int user_id                  { get; set; }
        public string username              { get; set; }
        public string email                 { get; set; }
        public string password              { get; set; }
        public DateTime creation_date       { get; set; }
        public string company_affiliation   { get; set; }
        public string user_industry         { get; set; }
        public string real_name             { get; set; }
        public int activity_count           { get; set; }
        public DateTime active_date         { get; set; }
        public string avatar                { get; set; }
        public List<Comment> comments       { get; set; }
        public List<Post> posts             { get; set; }
    }
}