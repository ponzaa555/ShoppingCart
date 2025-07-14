using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class ClaimPrincipalExtensions
    {
        // this เป็นการเพิ่ม method เข้าไปใน class  ClaimsPrincipal ก็จะสามารถเรียก function นี้ได้
        public static string RetrieveEmailFromPricipal(this ClaimsPrincipal user)
        {
            return user?.Claims?.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
        }
    }
}