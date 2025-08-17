using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductTypeConfiguration : IEntityTypeConfiguration<ProductType>
    {
        public void Configure(EntityTypeBuilder<ProductType> builder)
        {
            builder.ToTable("ProductTypes");
            builder.HasKey(t => t.Id);

            // map PK property 'Id' to the physical column 'ProductTypeId'
            builder.Property(t => t.Id)
                   .HasColumnName("ProductTypeId")
                   .UseMySqlIdentityColumn(); // Pomelo helper for AUTO_INCREMENT

            builder.Property(t => t.Name)
                   .IsRequired()
                   .HasMaxLength(100);
        }
    }
}