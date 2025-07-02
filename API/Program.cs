using API.Helpers;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using API.Controllers.Middleware;
using API.Extensions;
using StackExchange.Redis;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Core.Entities.Identity;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
{

    builder.WebHost.UseUrls("https://localhost:7153", "http://localhost:5153");
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddControllers();
    builder.Services.AddDbContext<StoreContext>( options => {
        options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
    });
    builder.Services.AddDbContext<AppIdentityDbContext>(options => {
        options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection"));
    });
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
app.MapControllers();
app.Run();

