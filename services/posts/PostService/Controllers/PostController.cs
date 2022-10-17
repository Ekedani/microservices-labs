using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PostService.Models;
using System.Net;

namespace PostService.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("api/posts")]
    public class PostController : ControllerBase
    {
        private List<Post> Posts = new List<Post>() 
        { 
            new Post() { Id = 1, Header = "Header 1", Body = "Some Text in Post 1", Author_Id = "1", Tag = "tag", Username = "username1" }, 
            new Post() { Id = 2, Header = "Header 2", Body = "Some Text in Post 2", Author_Id = "1", Tag = "tag", Username = "username1" }, 
            new Post() { Id = 3, Header = "Header 3", Body = "Some Text in Post 3", Author_Id = "1", Tag = "tag", Username = "username1" }, 
            new Post() { Id = 4, Header = "Header 4", Body = "Some Text in Post 4", Author_Id = "1", Tag = "tag", Username = "username1" }, 
            new Post() { Id = 5, Header = "Header 5", Body = "Some Text in Post 5", Author_Id = "1", Tag = "tag", Username = "username1" } 
        };

        public PostController()
        {
            //var jsonText = System.IO.File.ReadAllText(@"data.txt");
            //Posts = (List<Post>)JsonConvert.DeserializeObject<IList<Post>>(jsonText);
        }

        [HttpGet]
        public IEnumerable<Post> Get()
        {
            return Posts.ToArray();
        }

        [HttpGet]
        [Route("Get/{id}")]
        public Post Get(int id)
        {
            return Posts.ToArray().First(x=>x.Id == id);
        }


        [HttpPost]
        [Route("Add")]
        public async Task<ActionResult<Post>> Add(Post post)
        {
            if (post != null)
            {
                Posts.Add(post);
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

        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<ActionResult<Post>> Delete(int id)
        {
            if (Posts.Remove(Posts.First(x => x.Id == id)))
            {
                //string json = JsonConvert.SerializeObject(Posts);
                //System.IO.File.WriteAllText(@"data.txt", json);
                return Ok();
            }
            return BadRequest();
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