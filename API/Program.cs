using API.Helpers;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using API.Controllers.Middleware;
using API.Extensions;
using StackExchange.Redis;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Core.Entities.Identity;
using Microsoft.Extensions.FileProviders;


var builder = WebApplication.CreateBuilder(args);
// check run on production or dev
if(builder.Environment.IsDevelopment())
{
    Console.WriteLine("============== Runing On DEV Mode ==============");
     builder.Services.AddDbContext<StoreContext>( options => {
        options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
    });
    builder.Services.AddDbContext<AppIdentityDbContext>(options => {
        options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection"));
    });
}
else
{
    Console.WriteLine("============== Runing On Producton Mode ==============");
     builder.Services.AddDbContext<StoreContext>( options => {
        options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection") , ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection")));
    });
    builder.Services.AddDbContext<AppIdentityDbContext>(options => {
        options.UseMySql(builder.Configuration.GetConnectionString("IdentityConnection") , ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("IdentityConnection")));
    });
}

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
{

    builder.WebHost.UseUrls("http://0.0.0.0:5153");
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddControllers();
    builder.Services.AddSingleton<IConnectionMultiplexer>(c => {
        var configuration = ConfigurationOptions.Parse(builder.Configuration.GetConnectionString("Redis"), true);
        return ConnectionMultiplexer.Connect(configuration);  
    });
    builder.Services.AddAutoMapper(typeof(MappingProfiles));
    builder.Services.AddIdentityServices(builder.Configuration);
    builder.Services.AddApplicationServices();
    builder.Services.AddSwaggerDocumentation();
    //Enable CORS(Cross-Origin Resource Sharing)
    builder.Services.AddCors(options => 
    {
        options.AddPolicy("AllowAngularApp" , policy => 
        {
            policy.WithOrigins("https://localhost:4200")//or "*" to allow any origin (not recommended in prod)
                    .AllowAnyHeader()
                    .AllowAnyMethod();
        });
    });
}
var app = builder.Build();
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider; 
    var loggerFactory = services.GetRequiredService<ILoggerFactory>();

    try
    {
        var context = services.GetRequiredService<StoreContext>();
        // will applay pending migration to database
        await context.Database.MigrateAsync();
        await StoreContextSeed.SeedAsync(context , loggerFactory);

        var userManager =  services.GetRequiredService<UserManager<AppUser>>();
        var identityContext =services.GetRequiredService<AppIdentityDbContext>();
        // Apply Migration to AppIdentityDbContext database
        await identityContext.Database.MigrateAsync();
        //Post Seed data
        await AppIdentityDbContextSeed.SeedUsersAsync(userManager);

    }
    catch(Exception ex)
    {
        var logger = loggerFactory.CreateLogger<Program>();
        logger.LogError(ex,"An error occured during migration");
    }
}


// Configure the HTTP request pipeline.


if (app.Environment.IsDevelopment())
{
    app.UseSwaggerDocumentation();
}


app.UseCors("AllowAngularApp");
app.UseHttpsRedirection();
// Add Exception middleware
app.UseMiddleware<ExceptionMiddleware>();
app.UseAuthentication();
app.UseAuthorization();
// ถ้า endPoint ไหนไม่มีจะผ่าน middlewar และ Re generate response ที่ Controller Path
app.UseStatusCodePagesWithReExecute("/error/{0}");

app.UseStaticFiles();
// Take care of static image
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory() , "Content")
     ),
     RequestPath = "/content"
});
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "browser")),
    RequestPath = ""
});

app.MapControllers();
app.MapFallbackToController("Index","Fallback");
app.Run();

