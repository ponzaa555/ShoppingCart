
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class ProductController : BaseApiController
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductBrand> _productBandRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        private readonly ILogger<ProductController> _logger;
        private readonly IMapper _mapper;

        public ProductController(ILogger<ProductController> logger ,
            IGenericRepository<Product> productRepo ,
            IGenericRepository<ProductBrand> productBrandRepo, 
            IGenericRepository<ProductType> productTypeRepo,
            IMapper mapper)
        {
            _logger = logger;
            _productRepo = productRepo;
            _productBandRepo = productBrandRepo;
            _productTypeRepo = productTypeRepo; 
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
        {
            var spec = new ProductWithTypeAndBrandSpecification();
            var products = await _productRepo.ListAsync(spec);
            return Ok( _mapper.Map<IReadOnlyList<Product> , IReadOnlyList<ProductToReturnDto>>(products));
        }
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id )
        {
            var spec = new ProductWithTypeAndBrandSpecification(id);

            var product =  await _productRepo.GetEntityWithSpec(spec);
            if (product == null)
            {
                return NotFound(new ApiResponse(404));
            }
            return _mapper.Map<Product , ProductToReturnDto>(product);
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