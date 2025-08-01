using Core.Entities;

namespace Core.Specifications;

public class ProductWithTypeAndBrandSpecification : BaseSpecification<Product>
{
    
    // กรณีไม่ pass query condition
    public ProductWithTypeAndBrandSpecification(int id) : 
        base(x => x.Id == id)
    {
        AddInclude(p => p.ProductType);
        AddInclude(p => p.ProductBrand);
    }
    public ProductWithTypeAndBrandSpecification( string sort , int? brandId , int? typeId , int? take , int? skip , string? search)
        :base(x => 
            (!brandId.HasValue || x.ProductBrandId == brandId) &&
            (!typeId.HasValue || x.ProductTypeId == typeId) &&
            (string.IsNullOrEmpty(search) || x.Name.ToLower().Contains(search.ToLower()))
        )
    {
        AddInclude(p => p.ProductType);
        AddInclude(p => p.ProductBrand);
        //Defualt Sort
        AddOrderBy(p => p.Name);
        //Add Sort
        if(!string.IsNullOrEmpty(sort))
        {
            switch(sort)
            {
                case "priceAsc":
                    AddOrderBy(p => p.Price);
                    break;
                case "priceDesc":
                    AddOrderByDescending(p => p.Price);
                    break;
                default:
                    AddOrderBy(p => p.Name);
                    break;
            }
        }
        // Add Pagination
        // if(skip.HasValue && take.HasValue)
        // {
        //     ApplyPaging(skip.Value,take.Value);
        // }
    }
}