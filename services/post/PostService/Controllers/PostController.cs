using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PostService.Models;

namespace PostService.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("api/v2/posts")]
    public class PostController : ControllerBase
    {
        private List<Post> Posts = new List<Post>();

        public PostController()
        {
            var jsonText = System.IO.File.ReadAllText(@"data.txt");
            Posts = (List<Post>)JsonConvert.DeserializeObject<IList<Post>>(jsonText);
        }

        [HttpGet]
        [Route("GetAll")]
        public IEnumerable<Post> Get()
        {
            return Posts.ToArray();
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
    }
}