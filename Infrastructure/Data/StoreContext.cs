
using System.Reflection;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class StoreContext : DbContext
{
    //Constructure that need option 
    public StoreContext(DbContextOptions<StoreContext> options) : base(options)
    {
        
    }
    public DbSet<Product> Products {get; set;}
    public DbSet<ProductBrand> ProductBrands {get; set;}
    public DbSet<ProductType> ProductTypes {get; set;}
    public DbSet<Order> Orders {get; set;}
    public DbSet<OrderItem> OrderItems {get; set;}
    public DbSet<DeliveryMethod> DeliveryMethods {get; set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        //dut to SQLite does not support expressions of type 'decimal' in ORDER BY clauses

        /// Check database providername is that SQLite?
        if(Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
        {
            // We will loop to check all entity type are ther any decimal
            foreach(var entityType in modelBuilder.Model.GetEntityTypes())
            {
                // find properties that have decimal type
                var properties = entityType.ClrType.GetProperties().Where( p => p.PropertyType == typeof(decimal));

                // loop each properties
                foreach(var property in properties)
                {
                    modelBuilder.Entity(entityType.Name).Property(property.Name).HasConversion<double>();
                }
            }
        }
    }
}