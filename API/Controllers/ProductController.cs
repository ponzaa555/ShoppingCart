
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.helpers;
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
        public async Task<ActionResult<BasePaginationDto<ProductToReturnDto>>> GetProducts(
            string? sort , [FromQuery] int? brandId , [FromQuery] int? typeId ,[FromQuery] string? search ,
            [FromQuery] PaginationParams paginationParams)
        {
            var spec = new ProductWithTypeAndBrandSpecification(sort , brandId , typeId,paginationParams.PageSize,paginationParams.PageNumber,search);
            var resultPagination = await _productRepo.CreatePaginationAsync(spec , paginationParams.PageNumber ,paginationParams.PageSize);
            var data = BasePaginationDto<ProductToReturnDto>.MapPagination<Product,ProductToReturnDto>(resultPagination,_mapper);

            
            return Ok(data);
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