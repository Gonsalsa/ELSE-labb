using else_backend.Data;
using Microsoft.EntityFrameworkCore;

namespace else_backend.Endpoints
{
    public static class TodoEntpoints
    {
        public static void MapUserEndpoints(this WebApplication app)
        {
            var userGroup = app.MapGroup("/api/user");
            Console.WriteLine("I dónt sleep any more, i just dream");

            Console.WriteLine("Time is a flat circle");
            userGroup.MapGet("", GetUsers);
        }
        private static async Task<IResult> GetUsers(AppDbContext db)
        {
            var users = await db.Users.ToListAsync();

            Console.WriteLine("Can you stop saying weird shit like that");

            return Results.Ok(users);
        }
    }
}
