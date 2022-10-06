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
        private List<Post> Posts = new List<Post>();

        public PostController()
        {
            var jsonText = System.IO.File.ReadAllText(@"data.txt");
            Posts = (List<Post>)JsonConvert.DeserializeObject<IList<Post>>(jsonText);
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
            string json = JsonConvert.SerializeObject(post);
            if (json != null)
            {
                System.IO.File.WriteAllText(@"data.txt", json);
                return Ok(post);
            }
            return BadRequest();
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        public async Task<ActionResult<Post>> Delete(int id)
        {
            if (Posts.Remove(Posts.First(x => x.Id == id)))
            {
                string json = JsonConvert.SerializeObject(Posts);
                System.IO.File.WriteAllText(@"data.txt", json);
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