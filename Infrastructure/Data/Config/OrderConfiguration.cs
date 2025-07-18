using Core.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.OwnsOne(o => o.ShipToAddress , a => {
                a.WithOwner();
            });
            // Convert integer in enum to string
            builder.Property(s => s.Status)
                .HasConversion(
                    o => o.ToString(),
                    o => (OrderStatus) Enum.Parse(typeof(OrderStatus) , o )
                );
            // if delete order have to delete all item order 
            builder.HasMany( o => o.OrderItems).WithOne().OnDelete(DeleteBehavior.Cascade);
        }
    }
}