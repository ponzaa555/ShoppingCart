using Core.Entities;
using Core.helpers;
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

        public async Task<PagedList<T>> CreatePaginationAsync(ISpecification<T> spec , int pageNumber, int pageSize)
        {
            var sourceQuery = ApplySpecification(spec);
            var count = await sourceQuery.CountAsync();
            var items = await sourceQuery.Skip((pageNumber-1)*pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items,count,pageNumber,pageSize);
        }

        // this method use spect to create query command
        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_storeContext.Set<T>().AsQueryable() , spec);
        }

        public async Task<int> CountAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).CountAsync();
        }

        public void Add(T entity)
        {
            _storeContext.Set<T>().Add(entity);
        }

        public void Update(T entity)
        {
            _storeContext.Set<T>().Attach(entity);
            _storeContext.Entry(entity).State = EntityState.Modified;
        }

        public void Delete(T entity)
        {
            _storeContext.Set<T>().Remove(entity);
            
        }
    }
}