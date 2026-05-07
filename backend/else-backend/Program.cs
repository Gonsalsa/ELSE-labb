using else_backend.Data;
using else_backend.Endpoints;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connString = builder.Configuration
    .GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("No ConnString");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connString));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    db.Database.Migrate();

}

app.UseHttpsRedirection();
app.MapUserEndpoints();
app.Run();

