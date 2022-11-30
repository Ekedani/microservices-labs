using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using PostService.Consumer;
using PostService.Data;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddSingleton
    <IHostedService, ApacheKafkaConsumerService>();


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
string connectionStr =
    $"Server={Environment.GetEnvironmentVariable("DB_HOST")};Port=5432;Database={Environment.GetEnvironmentVariable("DB")};UserId={Environment.GetEnvironmentVariable("DB_USER")};Password={Environment.GetEnvironmentVariable("DB_PASSWORD")}";

//builder.Services.AddDbContext<AppDBContext>(opt =>
//    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddDbContext<AppDBContext>(opt =>
    opt.UseNpgsql(connectionStr).UseSnakeCaseNamingConvention());
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
    "default",
    "{controller=Post}/{action=GetAll}/{id?}");
app.MapControllers();
app.Run();