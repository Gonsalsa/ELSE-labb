using else_backend.Data;
using else_backend.Data.Dtos;
using else_backend.Data.Entities;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace else_backend.Endpoints
{
    public static class TodoEndpoints
    {
        public static void MapTodoEndpoints(this WebApplication app)
        {
            var todo = app.MapGroup("/api/todo");

            todo.MapGet("", GetTodo);
            todo.MapPost("", CreateToDo);
            todo.MapPut("{id:int}", UpdateToDo);
            todo.MapDelete("{id:int}", DeleteToDo);
        }
        private static async Task<IResult> GetTodo(AppDbContext db)
        {
            var todo = await db.todoItems.ToListAsync();
            return Results.Ok(todo);
        }

        private static async Task<IResult> CreateToDo(CreateTodoItemDto newToDo, AppDbContext db)
        {
            var toDo = new TodoItem
            {
                Title = newToDo.Title
            };

            db.todoItems.Add(toDo);
            await db.SaveChangesAsync();

            return Results.Created($"/api/todo{toDo.Id}", toDo);
        }

        private static async Task<Results<Ok, NotFound>> UpdateToDo(int id, TodoItem updated, AppDbContext db)
        {
            var existing = await db.todoItems.FindAsync(id);

            if (existing == null)
                return TypedResults.NotFound();

            existing.Title = string.IsNullOrWhiteSpace(updated.Title) ? existing.Title : updated.Title;

            existing.IsCompleted = updated.IsCompleted;

            await db.SaveChangesAsync();

            return TypedResults.Ok();
        }

        private static async Task<Results<NoContent, NotFound>> DeleteToDo(int id, AppDbContext db)
        {
            var existing = await db.todoItems.FindAsync(id);

            if (existing == null)
                return TypedResults.NotFound();

            db.todoItems.Remove(existing);
            await db.SaveChangesAsync();

            return TypedResults.NoContent();
        }
    }
}
