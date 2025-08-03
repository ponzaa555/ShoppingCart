using System.Text.Json;
using Core.Interfaces;
using Infrastructure.helpers;
using StackExchange.Redis;

namespace Infrastructure.Service
{
    public class ResponseCacheService : IResponseCacheService
    {
        private readonly IDatabase _database;
        public ResponseCacheService(IConnectionMultiplexer redis)
        {
            _database = redis.GetDatabase();
        }
        public async Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeToLive)
        {
            // push thing to redis
            if(response == null) return ;

            var options =  new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            // convert object to class
            var value = response;
            var serialisedResponse = JsonSerializer.Serialize(value, options);

            await _database.StringSetAsync(cacheKey ,  serialisedResponse , timeToLive);

        }

        public async Task<string> GetCachedResponseAsync(string cacheKey)
        {
            var cacheResponse = await _database.StringGetAsync(cacheKey);

            if(cacheResponse.IsNullOrEmpty)
            {
                return null;
            }
            return cacheResponse;
        }
    }
}