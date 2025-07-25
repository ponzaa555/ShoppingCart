using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class UserManagerExtension
    {
         public static async Task<AppUser> FindByEmailWithAddress(this UserManager<AppUser> input , 
         ClaimsPrincipal user)
         {
            var email = user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            // add include
            return await input.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);
         } 

         public static async Task<AppUser> FindByEmailFromClaimsPrinciple(this UserManager<AppUser> input ,
         ClaimsPrincipal user)
         {
            var email = user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            return await input.Users.SingleOrDefaultAsync(x => x.Email == email);
         }
    }
}