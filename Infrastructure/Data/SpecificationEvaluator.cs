using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class SpecificationEvaluator<TEntity>  where TEntity : BaseEntity 
    {
        /*
            what function do 
             .Include(p => p.ProductType)
             .Include(p => p.ProductBrand)
        */
        public static IQueryable<TEntity> GetQuery(
            IQueryable<TEntity> inputQuery , 
            ISpecification<TEntity> spec
        )
        {
            var query = inputQuery;

            if(spec.Criteria != null)
            {
                query = query.Where(spec.Criteria); // (spec.Criteria) is (p => p.ProductTypeId == id) 
            }
            if(spec.OrderBy != null)
            {
                query = query.OrderBy(spec.OrderBy);
            }
            if(spec.OrderByDescending != null)
            {
                query = query.OrderByDescending(spec.OrderByDescending);
            }
            query = spec.Includes.Aggregate(query, (current , include) => current.Include(include));
            /* คล้ายกับ
            foreach ( var include in spec.Includes)
            {
                query = query.Include(include);
            }
            */
            return query;
        }
    }
}