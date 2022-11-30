using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PostService.Data;
using PostService.Models;

namespace PostService.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("api/posts")]
    public class PostController : ControllerBase
    {
        //public IConfiguration server;
        private readonly AppDBContext _context;

        public PostController(AppDBContext context) //(IConfiguration server)
        {
            this._context = context;
            context.Database.EnsureCreated();
            //this.server = server;
            //var jsonText = System.IO.File.ReadAllText(@"data.txt");
            //posts = (List<Post>)JsonConvert.DeserializeObject<IList<Post>>(jsonText);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var posts = await _context.posts.ToListAsync();
            return Ok(posts);
            //var list = context.posts.ToList();
            //if (list.Any())
            //{
            //    return list;
            //}
            ////String sql = "SELECT id, header, body, author_id FROM Post";
            ////Database db = new Database(sql, this.server);
            ////if (db.data.HasRows)
            ////{
            ////    posts = new List<Post>();
            ////    while (db.data.Read())
            ////    {
            ////        posts.Add(new Post() { Id = (int)db.data[0], Header = db.data[1].ToString(), Body = db.data[2].ToString() , Author_Id = db.data[3].ToString() });
            ////    }
            ////}
            ////db.Close();
            //return new List<Post>();
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Post>> Get(int id)
        {
            var list = _context.posts.ToList();
            if (list.Any()) return list.First(x => x.Id == id);
            return NotFound();
        }


        [HttpPost]
        public async Task<ActionResult> Add([FromBody] Post post)
        {
            if (post != null)
            {
                _context.posts.Add(post);
                await _context.SaveChangesAsync();
                return Ok(post);
            }

            //string json = JsonConvert.SerializeObject(post);
            //if (json != null)
            //{
            //    System.IO.File.WriteAllText(@"data.txt", json);
            //    return Ok(post);
            //}
            return BadRequest();
        }

        [HttpPut]
        public async Task<ActionResult> Update([FromBody] Post post)
        {
            if (post != null)
            {
                _context.posts.Update(post);
                await _context.SaveChangesAsync();
                return Ok(post);
            }

            return BadRequest();
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var list = _context.posts.ToList();
            if (list.Any())
            {
                var itemToRemove = _context.posts.First(x => x.Id == id);
                if (itemToRemove != null)
                {
                    _context.posts.Remove(itemToRemove);
                    await _context.SaveChangesAsync();
                    return Ok(itemToRemove);
                }
            }

            //{
            //    //string json = JsonConvert.SerializeObject(posts);
            //    //System.IO.File.WriteAllText(@"data.txt", json);
            //    return Ok();
            //}
            return NotFound();
        }
    }
}