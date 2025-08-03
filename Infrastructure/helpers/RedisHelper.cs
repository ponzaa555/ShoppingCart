using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.helpers
{
    public class RedisHelper
    {
         public List<string> ContentTypes { get; set; }
        public string DeclaredType { get; set; }
        public List<string> Formatters { get; set; }
        public int StatusCode { get; set; }
        public object Value { get; set; }

    }
}