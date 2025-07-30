using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.Extensions.Configuration;
using Stripe;
using Product = Core.Entities.Product;
using Order = Core.Entities.OrderAggregate.Order;

namespace Infrastructure.Service
{
    public class PaymentService : IPaymentService
    {
        private readonly IBasketRepository _basketRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _config;
        public PaymentService(IBasketRepository basketRepository, IUnitOfWork unitOfWork, IConfiguration config)
        {
            _basketRepository = basketRepository;
            _unitOfWork = unitOfWork;
            _config = config;
        }
        public async Task<CustomerBasket> CreateOrUpdatePaymentIntent(string basketId)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var basket = await _basketRepository.GetBasketAsync(basketId);

            //  กัน error ไม่มี basket
            if( basket == null) return null;
            var shippingPrice = 0m;

            if (basket.DeliveryMethodId.HasValue)
            {
                // get delivery method from database
                var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>()
                    .GetByIdAsync((int) basket.DeliveryMethodId );
                shippingPrice = deliveryMethod.Price;
            }

            // Loop though product

            foreach(var item in basket.Items)
            {
                // protect user swap product infomation
                var productItems = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                if(item.Price != productItems.Price)
                {
                    item.Price = productItems.Price;
                }

            }

            // Stripe
            var service = new PaymentIntentService();

            // Create payment intnet
            PaymentIntent intent;

            // Check create payment intent or update payment intent
            if(string.IsNullOrEmpty(basket.PaymentIntendId))
            {
                // Create new paymentIntent
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long) basket.Items.Sum( i => i.Quantity * (i.Price * 100)) +(long) shippingPrice * 100 ,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string>{"card"}
                };
                //  Create payment Intent
                intent = await service.CreateAsync(options);
                basket.PaymentIntendId = intent.Id;
                basket.ClientSecret = intent.ClientSecret;
            }
            // update payment intent
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = (long ) basket.Items.Sum( i => i.Quantity * (i.Price * 100)) +(long) shippingPrice * 100
                };
                await service.UpdateAsync(basket.PaymentIntendId , options);
            }

            await _basketRepository.UpdateBasketAsync(basket);
            return basket;
        }

        public async Task<Order> UpdateOrderPaymentFailed(string paymentIntentId)
        {
            var spec = new OrderByPaymentIntentIdSepcification(paymentIntentId);
            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec); 

            if (order == null) return null;

            order.Status = OrderStatus.PaymentFailed;

            await _unitOfWork.Complete();
            return order;
        }

        public async Task<Order> UpdateOrderPaymentSucceeded(string paymentIntentId)
        {
            var spec = new OrderByPaymentIntentIdSepcification(paymentIntentId);
            var order = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            // Check we have order ?
            if(order == null) return null;

            order.Status = OrderStatus.PaymentRecieved;
            _unitOfWork.Repository<Order>().Update(order);

            await _unitOfWork.Complete();
            return null;
        }
    }
}