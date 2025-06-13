using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("error/{code}")]
    public class ErrorController : BaseApiController
    {
        [HttpGet]
        public IActionResult Error(int code)
        {
            // ObjectResult() มัรคือ response แบบ json พวก header body
            return new ObjectResult(new ApiResponse(code));
        }
    }
}