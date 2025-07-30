using System.Linq.Expressions;
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrderByPaymentIntentIdWithItemsSepcification : BaseSpecification<Order>
    {
        public OrderByPaymentIntentIdWithItemsSepcification(string PaymentIntendId) : 
            base(o => o.PaymentIntenId == PaymentIntendId)
        {
            
        }   
    }
}