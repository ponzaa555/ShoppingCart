using System.Linq.Expressions;

namespace Core.Specifications
{
    public interface ISpecification<T>
    {
        // Where Case
        Expression<Func<T , bool>> Criteria {get;} 
        // Include 
        List<Expression<Func<T,object>>> Includes {get;}
        // Order
        Expression<Func<T,object>> OrderBy {get;}
        Expression<Func<T , object>> OrderByDescending {get;}
        // For Pagination
        int Take {get;}
        int Skip {get;}
        bool IsPageingEnable {get;}
    }
}