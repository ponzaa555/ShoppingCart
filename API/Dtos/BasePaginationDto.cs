using AutoMapper;
using Core.helpers;

namespace API.Dtos;

public class BasePaginationDto<TDest>
{
    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
    public int PageSize { get; set; }
    public int TotalCount { get; set; }
    public IReadOnlyList<TDest> Data { get; set; }

    public static BasePaginationDto<TDest> MapPagination<TSource, TDest>(
        PagedList<TSource> source,
        IMapper mapper)
    {
        return new BasePaginationDto<TDest>
        {
            CurrentPage = source.CurrentPage,
            TotalPages = source.TotalPages,
            PageSize = source.PageSize,
            TotalCount = source.TotalCount,
            Data = mapper.Map<IReadOnlyList<TDest>>(source.Data)
        };
    }
}