using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    public class Address
    {
        // For Entity Framework
        public Address()
        {
            
        }
        // For create new address
        public Address(string fistName , string lastName , string street, string city, string state, string zipcode)
        {
            FirstName = fistName;
            LastName = lastName;
            Street = street;
            City = city;
            State = state;
            Zipcode = zipcode;
        }
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public string Street {get; set;}
        public string City {get; set;}
        public string State {get; set;}
        public string  Zipcode {get; set;}
    }
}