using System.Net;
using Microsoft.EntityFrameworkCore;
using PostService.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

string ConnectionSTR = $"Server={Environment.GetEnvironmentVariable("DB_HOST")};Port=5432;Database={Environment.GetEnvironmentVariable("DB")};UserId={Environment.GetEnvironmentVariable("DB_USER")};Password={Environment.GetEnvironmentVariable("DB_PASSWORD")}";

//builder.Services.AddDbContext<AppDBContext>(opt =>
//    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddDbContext<AppDBContext>(opt =>
    opt.UseNpgsql(ConnectionSTR));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
}
app.UseCors(x => x
.AllowAnyOrigin()
.AllowAnyMethod()
.AllowAnyHeader());

app.UseStaticFiles();
app.UseRouting();
app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Post}/{action=GetAll}/{id?}");

app.MapControllers();

app.Run();
