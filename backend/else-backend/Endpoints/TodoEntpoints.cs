using else_backend.Data;
using else_backend.Data.Enties;
using Microsoft.EntityFrameworkCore;

namespace else_backend.Endpoints
{
    public static class TodoEntpoints
    {
        public static void MapTodoEndpoints(this WebApplication app)
        {
            var todo = app.MapGroup("/api/todo");

            todo.MapGet("", GetTodo);
            todo.MapPost("", CreatTodo);
        }
        private static async Task<IResult> GetTodo(AppDbContext db)
        {
            var todo = await db.todoItems.ToListAsync();
            return Results.Ok(todo);
        }

        //A big catastrophy have been avoided, all quiet on the western front

        private static async Task<IResult> CreatTodo(TodoItem todo, AppDbContext db)
        {
            db.todoItems.Add(todo);
            await db.SaveChangesAsync();

            return Results.Created($"/api/todo{todo.Id}", todo);
        }  
    }
}
