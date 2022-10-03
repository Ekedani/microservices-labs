var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

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
