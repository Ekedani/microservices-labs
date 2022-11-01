using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PostService.Models;

namespace PostService.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {
        }
        
        public virtual DbSet<Post> posts { get; set; }
    }
}
