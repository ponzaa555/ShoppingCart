using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Service
{
    public class OrderService : IOrderService
    {
        private readonly IBasketRepository _basketRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPaymentService _paymentService;
        public OrderService( IBasketRepository basketRepo , IUnitOfWork unitOfWork , IPaymentService paymentService)
        {
           _unitOfWork = unitOfWork;
            _basketRepo = basketRepo;
            _paymentService = paymentService; 
        }
        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            // get basket from the repo but don't trust price in baseket 
            var basket = await _basketRepo.GetBasketAsync(basketId);

            // get item from product repo
            var items = new List<OrderItem>();
            foreach(var item in basket.Items)
            {
                var productItem = await _unitOfWork.Repository<Product>().GetByIdAsync(item.Id);
                var itemOrdered = new ProductItemOrdered(item.Id , productItem.Name , productItem.PictureUrl);
                var orderItem = new OrderItem(itemOrdered , item.Quantity ,productItem.Price);
                items.Add(orderItem);
            }

            // get delivery method 
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);

            // calculate subtotal
            var subtotal = items.Sum(i => i.Quantity * i.Price);

            // check existing order ?
            var spec = new  OrderByPaymentIntentIdSepcification(basket.PaymentIntendId);
            var existingOrder =  await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);

            // if have existing order
            if(existingOrder !=  null)
            {
                _unitOfWork.Repository<Order>().Delete(existingOrder);
                // update PaymetIntent
                await _paymentService.CreateOrUpdatePaymentIntent(basket.PaymentIntendId);
            }

            // create order
            var order = new Order(buyerEmail , shippingAddress ,deliveryMethod , items , subtotal,basket.PaymentIntendId);
            // this just tracking to save to db
            _unitOfWork.Repository<Order>().Add(order);

            // save to db and if failed any change that taken place will rollback and sent error instead
            var result = await _unitOfWork.Complete();
            if(result <= 0) return null;

            // delete Basket แต่ไม่ใช้เพราะถ้า payment fail และลบ payment ใหม่จะไม่เจอ basket ละ error
            // await _basketRepo.DeleteBasketAsync(basketId);
            
            // return order
            return order;
        }

        public Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemAndOrderingSpecification(id , buyerEmail);
            
            // return Applyspec
            return  await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemAndOrderingSpecification(buyerEmail);
            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }
    }
}