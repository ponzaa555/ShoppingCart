namespace Core.Entities.OrderAggregate
{
    public class Order : BaseEntity
    {
        public Order()
        {
            
        }
        public Order(string buyerEmail , Address shipToAddress , DeliveryMethod deliveryMethod , 
        IReadOnlyList<OrderItem> orderItems ,decimal subtotal , string paymentIntenId)
        {
            BuyerEmail = buyerEmail;
            ShipToAddress = shipToAddress;
            DeliveryMethod = deliveryMethod;
            OrderItems = orderItems;
            Subtotal = subtotal; 
            PaymentIntenId = paymentIntenId;
        }
        public string BuyerEmail {get; set;}
        public DateTimeOffset OrderDate {get; set;} = DateTimeOffset.Now;
        public Address ShipToAddress {get; set;}
        public DeliveryMethod DeliveryMethod {get; set;}
        public IReadOnlyList<OrderItem> OrderItems {get; set;}
        public decimal Subtotal {get; set;}
        public OrderStatus Status {get; set;} = OrderStatus.Pending;
        public string? PaymentIntenId {get; set;} 
         
         // method to calculate the total price
         public decimal GetTotal()
         {
            return Subtotal + DeliveryMethod.Price;
         }
    }
}