using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("error/{code}")]
    // Swagger Ignore HTTP Method 
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController : BaseApiController
    {
        public IActionResult Error(int code)
        {
            // ObjectResult() มัรคือ response แบบ json พวก header body
            return new ObjectResult(new ApiResponse(code));
        }
    }
}