namespace PostService.Models
{
    public class Post
    {
        public int id { get; set; }
        public string header { get; set; } 
        public string body { get; set; }
        public string author_id { get; set; }
    }
}
