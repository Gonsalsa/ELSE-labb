using else_backend.Data;
using Microsoft.EntityFrameworkCore;
using System.Net.NetworkInformation;

namespace else_backend.Endpoints
{
    public static class UserEndpoints
    {
        public static void MapUserEndpoints(this WebApplication app)
        {
            var userGroup = app.MapGroup("/api/user");

            userGroup.MapGet("", GetUsers);
        }
        private static async Task<IResult> GetUsers(AppDbContext db)
        {
            var users = await db.Users.ToListAsync();
            return Results.Ok(users);
        }



    }
}
