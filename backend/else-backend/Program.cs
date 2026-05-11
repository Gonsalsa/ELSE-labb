using else_backend.Data;
using else_backend.Endpoints;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var connString = builder.Configuration
    .GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("No ConnString");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connString));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors(options => options.AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod());

app.UseSwagger();
app.UseSwaggerUI();


using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    db.Database.Migrate();

}

app.UseHttpsRedirection();
app.MapUserEndpoints();
app.MapTodoEndpoints();


app.Run();

