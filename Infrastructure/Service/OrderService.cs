using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;

namespace Infrastructure.Service
{
    public class OrderService : IOrderService
    {
        private readonly IBasketRepository _basketRepo;
        private readonly IUnitOfWork _unitOfWork;
        public OrderService( IBasketRepository basketRepo , IUnitOfWork unitOfWork)
        {
           _unitOfWork = unitOfWork;
            _basketRepo = basketRepo;
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

            // create order
            var order = new Order(buyerEmail , shippingAddress ,deliveryMethod , items , subtotal);
            // this just tracking to save to db
            _unitOfWork.Repository<Order>().Add(order);

            // save to db and if failed any change that taken place will rollback and sent error instead
            var result = await _unitOfWork.Complete();
            if(result <= 0) return null;

            // delete Basket
            await _basketRepo.DeleteBasketAsync(basketId);
            // return order
            return order;
        }

        public Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            throw new NotImplementedException();
        }

        public Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            throw new NotImplementedException();
        }
    }
}