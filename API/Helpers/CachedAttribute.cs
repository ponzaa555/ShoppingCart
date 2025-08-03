using System.Text;
using System.Text.Json;
using API.Dtos;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;

namespace API.Helpers
{
    public class CachedAttribute : Attribute, IAsyncActionFilter
    {
        private readonly int _timeToLiveSeconds;
        public CachedAttribute(int timeToLiveSeconds)
        {
            _timeToLiveSeconds = timeToLiveSeconds;   
        }
        // IAsyncActionFilter allow code to run before and after request execute
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            // get cacheService
            var cacheService = 
                context.HttpContext.RequestServices.GetRequiredService<IResponseCacheService>();
            
            var cacheKey =  GenerateCacheKeyFromRequest(context.HttpContext.Request);
            var cacheResponse = await cacheService.GetCachedResponseAsync(cacheKey);

            // มีของใน cache
            if(!string.IsNullOrEmpty(cacheResponse))
            {
                // so we skip to call controller and we create own result
                /*
                var contentResult = new ContentResult
                {
                    Content = cacheResponse,
                    ContentType = "application/json",
                    StatusCode = 200,
                };
                context.Result = contentResult;
                return ;
                */

                // cacheResponse มา แบบ string ่json เลยจะ convert ก่อน
                // var cacheResponseJson = JsonConvert.DeserializeObject<RedisDto<List<TagDto>>>(cacheResponse);
                // Console.WriteLine("cacheResponseJson : " , cacheResponseJson);
                // Create response
                context.HttpContext.Response.StatusCode = 200;
                context.HttpContext.Response.ContentType = "application/json";
                await context.HttpContext.Response.WriteAsync(cacheResponse);
                return;
            }
            // ไม่มีของใน cache so we let controller execute request
            var executedContext = await next(); // move to controller

            if(executedContext.Result is OkObjectResult okObjectResult)
            {
                //  put result to cache
                await cacheService.CacheResponseAsync(cacheKey , okObjectResult.Value , TimeSpan.FromSeconds(_timeToLiveSeconds));
            }
        }

        private string GenerateCacheKeyFromRequest(HttpRequest request)
        {
            var keyBuilder = new StringBuilder();

            keyBuilder.Append($"{request.Path}");

            foreach(var (key , value) in request.Query.OrderBy(x => x.Key))
            {
                keyBuilder.Append($"|{key}-{value}");
            }
            return keyBuilder.ToString();
        }
    }
} 