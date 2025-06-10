using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext : DbContext
{
    //Constructure that need option 
    public StoreContext(DbContextOptions<StoreContext> options) : base(options)
    {
        
    }
    public DbSet<Product> Products {get; set;}
}