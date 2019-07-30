using Microsoft.EntityFrameworkCore;

namespace back_end
{
    public class DlylContext: DbContext
    {
        internal object thread;

        public DbSet<User> users        { get; set; }
        public DbSet<Article> articles  { get; set; }
        public DbSet<Comment> comments  { get; set; }
        public DbSet<Post> posts        { get; set; }
        public DlylContext(DbContextOptions<DlylContext> options) : base(options)
        {

        }
    }
}