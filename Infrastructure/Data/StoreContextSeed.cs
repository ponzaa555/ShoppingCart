using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context , ILoggerFactory loggerFactory)
        {
            var basePath = "Data/Seed";
            try
            {
                if(!context.ProductBrands.Any())
                {
                    var brandsPath = Path.Combine(basePath, "brands.json");
                    var brandsData = File.ReadAllText(brandsPath);
                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData); 
                    foreach( var item in brands)
                    {
                        context.ProductBrands.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                if(!context.ProductTypes.Any())
                {
                    var typesPath = Path.Combine(basePath,"types.json");
                    var typesData = File.ReadAllText(typesPath);
                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData); 
                    foreach( var item in types)
                    {
                        context.ProductTypes.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                if(!context.Products.Any())
                {
                    var productPath = Path.Combine(basePath, "products.json");
                    var productsData = File.ReadAllText(productPath);
                    var products = JsonSerializer.Deserialize<List<Product>>(productsData); 
                    foreach( var item in products)
                    {
                        context.Products.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
                 if(!context.DeliveryMethods .Any())
                {
                    var deliveryPath = Path.Combine(basePath, "delivery.json");
                    var deliveryMethodData = File.ReadAllText(deliveryPath);
                    var deliveryMethods = JsonSerializer.Deserialize<List<DeliveryMethod>>(deliveryMethodData); 
                    foreach( var item in deliveryMethods)
                    {
                        context.DeliveryMethods.Add(item);
                    }
                    await context.SaveChangesAsync();
                }
            }
            catch(Exception ex)
            {
                var logger =loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(ex.Message); 
            }
        }
    }
}