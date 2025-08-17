using API.Errors;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Controllers
{
    public class PaymentController : BaseApiController
    {
        private readonly IPaymentService _paymentService;
        // this for stripe to skip authorize
        private readonly string _WhSercet ;
        private readonly ILogger<IPaymentService> _logger;
        public PaymentController(IPaymentService paymentService , ILogger<IPaymentService> logger , IConfiguration config)
        {
            _paymentService = paymentService;
            _logger = logger;
            _WhSercet = config.GetSection("StripeSettings:WhSecret").Value;
        }

        [Authorize]
        [HttpPost("{basketId}")]
        public async Task<ActionResult<CustomerBasket>> CreateOrUpdatePaymentIntent(string basketId)
        {
            var basket = await _paymentService.CreateOrUpdatePaymentIntent(basketId);

            if(basket == null)
            {
                return BadRequest(new ApiResponse(400 , "Problem with your basket"));
            }

            return basket;
        }

        [HttpPost("webHook")]
        public async Task<ActionResult> StripeWebhook()
        {
            var json =  await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            // To confrim this from stripe
            var stripeEvent = EventUtility.ConstructEvent(json , Request.Headers["Stripe-Signature"],_WhSercet);

            PaymentIntent paymentIntent ;
            Order order;

            switch (stripeEvent.Type)
            {
                case "payment_intent.succeeded" :
                    paymentIntent = (PaymentIntent) stripeEvent.Data.Object;
                    _logger.LogInformation("Payment Succeeded : ", paymentIntent.Id);
                    // TODO update order with new status pending -> success
                    order = await _paymentService.UpdateOrderPaymentSucceeded(paymentIntent.Id);
                    _logger.LogInformation("Order updated to payment received " , order.Id);
                    break;
                 case "payment_intent.payment_failed" :
                    paymentIntent = (PaymentIntent) stripeEvent.Data.Object;
                    _logger.LogInformation("Payment Failed : " , paymentIntent.Id);
                    // TODO update order status to fail payment
                    order = await _paymentService.UpdateOrderPaymentFailed(paymentIntent.Id);
                     _logger.LogInformation("Order updated to payment failed " , order.Id);
                    break;
            }

            // confrim to stripe that we receive response because if not tell stripe we recive response. stripe will resend again
            return new EmptyResult();
        }
    }
}