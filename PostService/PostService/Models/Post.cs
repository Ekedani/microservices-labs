namespace PostService.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Header { get; set; } 
        public string Body { get; set; }
        public int Author_Id { get; set; }
    }
}
