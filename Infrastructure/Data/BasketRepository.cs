using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Data
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase _database; 
        public BasketRepository(IConnectionMultiplexer redis)
        {
            // connect to redis database
            _database = redis.GetDatabase();
        }       
         public async Task<bool> DeleteBasketAsync(string basketId)
        {
            return await _database.KeyDeleteAsync(basketId);
        }

        public async Task<CustomerBasket> GetBasketAsync(string basketId)
        {
            // Get data from redis database it is string
            var data = await _database.StringGetAsync(basketId);

            // if data is null reutrn null if not convert to CustomerBasket Struct
            return data.IsNullOrEmpty ? null :  JsonSerializer.Deserialize<CustomerBasket>(data);
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            var created = await _database.StringSetAsync(basket.Id , 
                JsonSerializer.Serialize(basket) , TimeSpan.FromDays(30));

            if(!created) return null;

            return await GetBasketAsync(basket.Id);
        }
    }
}