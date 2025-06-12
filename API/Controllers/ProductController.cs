
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductBrand> _productBandRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        private readonly ILogger<ProductController> _logger;

        public ProductController(ILogger<ProductController> logger ,
            IGenericRepository<Product> productRepo ,
            IGenericRepository<ProductBrand> productBrandRepo, 
            IGenericRepository<ProductType> productTypeRepo)
        {
            _logger = logger;
            _productRepo = productRepo;
            _productBandRepo = productBrandRepo;
            _productTypeRepo = productTypeRepo; 
        }
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var spec = new ProductWithTypeAndBrandSpecification();
            var products = await _productRepo.ListAsync(spec);
            return Ok(products);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id )
        {

            return await _productRepo.GetByIdAsync(id);
        }
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>>  GetProductBrands()
        {
            return Ok(await _productBandRepo.ListAllAsync());
        }
         [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>>  GetProductTypes()
        {
            return Ok(await _productTypeRepo.ListAllAsync());
        }
    }
}