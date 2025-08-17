using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductBrandConfiguration : IEntityTypeConfiguration<ProductBrand>
    {
        public void Configure(EntityTypeBuilder<ProductBrand> builder)
        {
            builder.ToTable("ProductBrands");
            builder.HasKey(b => b.Id);

            builder.Property(b => b.Id)
                .HasColumnName("ProductBrandId")
                .UseMySqlIdentityColumn();

            builder.Property(b => b.Name)
                .IsRequired()
                .HasMaxLength(100);
            }
    }
}