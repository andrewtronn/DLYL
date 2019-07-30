using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_end.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private DlylContext _context;
        public CommentController(DlylContext context)
        {
            _context = context;
        }

        // GET api
        [HttpGet]
        public ActionResult Get()
        {
            if(_context.comments.ToList().Count() == 0)
            {
                return NoContent();
            }
            return Ok(_context.comments.ToList());
        }

        // GET BY ID api
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            Comment comment = _context.comments.FirstOrDefault(c => c.comment_id == id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        // POST api
        [HttpPost]
        public ActionResult Post([FromBody] Comment c)
        {
            if (c == null)
            {
                return BadRequest();
            }

            _context.comments.Add(c);
            _context.SaveChanges();

            return Ok(_context.comments.ToList());
        }

        // PUT api
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Comment c)
        {
            Comment comment = _context.comments.FirstOrDefault(_c => _c.comment_id == id);
            if(comment == null)
            {
                return NotFound();
            }

            comment.comment = c.comment;
            comment.user_id = c.user_id;
            comment.article_id = c.article_id;
            _context.SaveChanges();

            return Ok(_context.comments.ToList());
        }

        // DELETE api
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            Comment comment = _context.comments.FirstOrDefault(c => c.comment_id == id);
            if(comment == null)
            {
                return NotFound();
            }
            _context.comments.Remove(comment);
            _context.SaveChanges();

            return Ok(_context.comments.ToList());
        }
    }
}
