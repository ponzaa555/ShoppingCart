using Core.Entities;

namespace Core.Specifications;

public class ProductWithTypeAndBrandSpecification : BaseSpecification<Product>
{
    // กรณีไม่ pass query condition
    public ProductWithTypeAndBrandSpecification()
    {
        AddInclude(p => p.ProductType);
        AddInclude(p => p.ProductBrand);
    }
}