using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode , string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefualtMessageForStatusCode(statusCode);   
        }
        public int StatusCode { get; set; }
        public string Message {get; set;}

        private string GetDefualtMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "A bad request",
                401 => "Authorized, you are not",
                404 => "Resource found , it was not",
                500 => "Error Internal server",
                _ => null
            };
        }
    }
}