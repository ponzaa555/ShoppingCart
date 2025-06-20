namespace Core.helpers
{
    public class PagedList<T> : List<T>
    {
        public PagedList(IReadOnlyList<T> currentPage, int count, int pageNumber, int pageSize)
        {
            CurrentPage = pageNumber;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            PageSize = pageSize;
            TotalCount = count;
            Data = currentPage;
        }
        public int CurrentPage { get; set; } 
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public IReadOnlyList<T> Data {get; set;}

        // ใช้ วิธีนี้มันจะ ทำให้  layer application ต่อลงdatabase ได้
        // public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
        // {
        //     var count = await source.CountAsync();
        //     var items = await source.Skip((pageNumber) * pageSize).Take(pageSize).ToListAsync();
        //     return new PagedList<T>(items, count, pageNumber, pageSize);
        // }
    }
}