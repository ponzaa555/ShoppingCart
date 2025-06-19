using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly StoreContext _storeContext;
        public GenericRepository(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }
        public async Task<T> GetByIdAsync(int id)
        {
            return await _storeContext.Set<T>().FindAsync(id);
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await  _storeContext.Set<T>().ToListAsync();
        }
        public async Task<T> GetEntityWithSpec(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }
        public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec)
        {
            
            return await ApplySpecification(spec).ToListAsync();
        }

          public async Task<GenericPagedResult<T>> ListAsyncWithPagination(ISpecification<T> spec)
        {
            var basequery =  ApplySpecification(spec);
            var totalCount = await basequery.CountAsync();
            if (spec.IsPageingEnable)
            {
                 // Pagination
                var skipAmont = (spec.Skip-1) * spec.Take;
                basequery = basequery.Skip(skipAmont).Take(spec.Take);
            }
            var data = await basequery.ToListAsync();
            return new GenericPagedResult<T>
            {
                TotalCount = totalCount,
                Data = data
            };
        }
        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_storeContext.Set<T>().AsQueryable() , spec);
        }
    }
}