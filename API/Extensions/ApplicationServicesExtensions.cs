using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Errors;
using Core.Interfaces;
using Infrastructure;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<IProductRepository , ProductRepository>();
            services.AddScoped(typeof(IGenericRepository<>) , typeof(GenericRepository<>));
            services.AddScoped<IBasketRepository , BasketRepository>();

            // OverWrite [ApiController] behavior ตัวนี้จะช่วยดัก และ แสดง Error ก่อนถ้า input is validation แต่อยากให้ error เหมือนกันหดม
            // เลย overite การ return error
            services.Configure<ApiBehaviorOptions>(options => {
                options.InvalidModelStateResponseFactory = actionContex => 
                {
                    // ModelState is dictionary type of object มันเป็น หัวข้อ error "userName" : {"must have 8 chractor" , "Should contain Capital"}
                    var errors = actionContex.ModelState
                                    .Where(e => e.Value.Errors.Count > 0)
                                    .SelectMany(x => x.Value.Errors)
                                    .Select(x => x.ErrorMessage).ToArray();

                    var errorResonse = new ApiValidationErrors
                    {
                        Errors = errors
                    };

                    return new BadRequestObjectResult(errorResonse);
                };
            });

            return services;
        }
    }
}