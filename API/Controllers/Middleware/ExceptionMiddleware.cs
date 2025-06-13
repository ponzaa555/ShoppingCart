using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;

namespace API.Controllers.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next , ILogger<ExceptionMiddleware> logger,
            IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }
        
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex , ex.Message);
                // Create Http Context
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)StatusCodes.Status500InternalServerError;

                // Create Response Body
                var respose = _env.IsDevelopment() ? new ApiException(
                    (int)StatusCodes.Status500InternalServerError , ex.Message , ex.StackTrace.ToString())
                    : new ApiException((int)StatusCodes.Status500InternalServerError);
                
                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
                // Convert response to json
                var json = JsonSerializer.Serialize(respose , options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}