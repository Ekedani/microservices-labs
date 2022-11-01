using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PostService.Models;
using System.Net;
using Microsoft.EntityFrameworkCore;
using PostService.Data;

namespace PostService.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("api/posts")]
    public class PostController : ControllerBase
    {
        //public IConfiguration server;
        private AppDBContext context;

        private List<Post> Posts = new List<Post>() 
        { 
            new Post() { id = 1, header = "Header 1", body = "Some Text in Post 1", author_id = "1" }, 
            new Post() { id = 2, header = "Header 2", body = "Some Text in Post 2", author_id = "1" }, 
            new Post() { id = 3, header = "Header 3", body = "Some Text in Post 3", author_id = "1"}, 
            new Post() { id = 4, header = "Header 4", body = "Some Text in Post 4", author_id = "1"}, 
            new Post() { id = 5, header = "Header 5", body = "Some Text in Post 5", author_id = "1"} 
        };

        public PostController(AppDBContext context)//(IConfiguration server)
        {

            this.context = context;
            context.Database.EnsureCreated();
            //this.server = server;
            //var jsonText = System.IO.File.ReadAllText(@"data.txt");
            //posts = (List<Post>)JsonConvert.DeserializeObject<IList<Post>>(jsonText);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var posts = await context.posts.ToListAsync();
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
        [Route("/{id}")]
        public async Task<ActionResult<Post>> Get(int id)
        {
            var list = context.posts.ToList();
            if (list.Any())
            {
                return list.First(x => x.id == id);
            }
            return NotFound();
        }


        [HttpPost]
        public async Task<ActionResult> Add([FromBody] Post post)
        {
            if (post != null)
            {
                context.posts.Add(post);
                await context.SaveChangesAsync();
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
                context.posts.Update(post);
                await context.SaveChangesAsync();
                return Ok(post);
            }
            return BadRequest();
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            var list = context.posts.ToList();
            if (list.Any())
            {
                var itemToRemove = context.posts.First(x => x.Id == id);
                if (itemToRemove != null)
                {
                    context.posts.Remove(itemToRemove);
                    await context.SaveChangesAsync();
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

        public static string HttpGet(string uri)
        {
            string content = null;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(uri);
            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            using (Stream stream = response.GetResponseStream())
            using (StreamReader sr = new StreamReader(stream))
            {
                content = sr.ReadToEnd();
            }
            return content;
        }
    }
}