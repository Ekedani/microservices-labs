using System.ComponentModel.DataAnnotations.Schema;

namespace PostService.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Header { get; set; } 
        public string Body { get; set; }
        public string Author_id { get; set; }
    }
}
