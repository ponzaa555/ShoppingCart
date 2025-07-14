using Core.Entities;
using Core.helpers;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> ListAllAsync();
        Task<T> GetEntityWithSpec(ISpecification<T> spec);
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
        Task<GenericPagedResult<T>> ListAsyncWithPagination(ISpecification<T> spec);
        Task<PagedList<T>> CreatePaginationAsync(ISpecification<T> spec , int pageNumber, int pageSize);
        Task<int> CountAsync(ISpecification<T> spec);

        // We not use asynchronus method due to all method just tracking in memory not save to database
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}