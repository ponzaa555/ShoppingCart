using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public enum OrderStatus
    {
        [EnumMember(Value = "Pending")]
        // ใช้อันนี้เนื่องจากถ้า ไม่ใส่ pending จะเป็นค่าเริ่มต้นของ enum คือ 0
         Pending, // 0
         [EnumMember(Value = "Payment Recieved")]
         PaymentRecieved, //1
         [EnumMember(Value = "Payment Failed")]
         PaymentFailed
    }
}