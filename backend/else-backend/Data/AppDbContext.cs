using else_backend.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace else_backend.Data
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<TodoItem> todoItems => Set<TodoItem>();
        public DbSet<User> Users => Set<User>();
    }
}
