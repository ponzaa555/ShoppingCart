
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _repository;
        private readonly ILogger<ProductController> _logger;

        public ProductController(ILogger<ProductController> logger , IProductRepository repository)
        {
            _logger = logger;
            _repository = repository; 
        }
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _repository.GetProductsAsync();
            return Ok(products);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id )
        {

            return await _repository.GetProductByIdAsync(id);
        }
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>>  GetProductBrands()
        {
            return Ok(await _repository.GetProductBrandsAsync());
        }
         [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>>  GetProductTypes()
        {
            return Ok(await _repository.GetProductTypesAsync());
        }
    }
}