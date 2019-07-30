using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace back_end.Controllers
{
    [Route("api/posts")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private DlylContext _context;
        public PostController(DlylContext context)
        {
            _context = context;
        }

        // Get api
        [HttpGet]
        public ActionResult Get()
        {
            if(_context.posts.ToList().Count() == 0)
            {
                return NoContent();
            }
            return Ok();
        }
        
        // Get by id api
        [HttpGet("{id}")]
        public ActionResult Get (int id)
        {
            Post post = _context.posts.FirstOrDefault(p => p.post_id == id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        // Post api
        [HttpPost]
        public ActionResult Post([FromBody] Post p)
        {
            if(p == null)
            {
                return BadRequest();
            }

            _context.posts.Add(p);
            _context.SaveChanges();

            return Ok(_context.posts.ToList());
        }

        // Put api
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Post p)
        {
            Post post = _context.posts.FirstOrDefault(_p => _p.post_id == id);
            if (post == null)
            {
                return NotFound();
            }

            post.user_id = p.user_id;
            post.title = p.title;
            post.body = p.body;
            _context.SaveChanges();

            return Ok(_context.posts.ToList());
        }

        // Delete api
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            Post post = _context.posts.FirstOrDefault(p => p.post_id == id);
            if (post == null)
            {
                return NotFound();
            }

            _context.posts.Remove(post);
            _context.SaveChanges();

            return Ok(_context.posts.ToList());
        }
    }
}