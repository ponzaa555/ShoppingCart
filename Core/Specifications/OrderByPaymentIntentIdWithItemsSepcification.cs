using System.Linq.Expressions;
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrderByPaymentIntentIdSepcification : BaseSpecification<Order>
    {
        public OrderByPaymentIntentIdSepcification(string PaymentIntendId) : 
            base(o => o.PaymentIntenId == PaymentIntendId)
        {
            
        }   
    }
}