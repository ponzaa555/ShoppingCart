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
        private const string WhSercet = "whsec_2c8eba9d0a325a6841ab2895c4f62c503216e01f1a7d28633cd3b7faf54501cf";
        private readonly ILogger<IPaymentService> _logger;
        public PaymentController(IPaymentService paymentService , ILogger<IPaymentService> logger)
        {
            _paymentService = paymentService;
            _logger = logger;
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
            var stripeEvent = EventUtility.ConstructEvent(json , Request.Headers["Stripe-Signature"],WhSercet);

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