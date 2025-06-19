using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class GenericPagedResult<T> : List<T>
    {
        public IReadOnlyList<T> Data {get; set;}
        public int TotalCount {get; set;}
    }
}