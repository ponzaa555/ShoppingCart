using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class PaginationReturn
    {
        public int PageIndex {get; set;} = 0;
        public int PageSize {get; set;} = 0;
        public int Count {get; set;} = 0;
        public IReadOnlyList<ProductToReturnDto> Data {get; set;}
    }
}