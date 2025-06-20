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
    }
}