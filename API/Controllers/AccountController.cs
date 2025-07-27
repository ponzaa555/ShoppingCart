using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly ILogger<AccountController> _logger;
        public AccountController(UserManager<AppUser> userManager , SignInManager<AppUser> signInManager
        , ITokenService tokenService , IMapper mapper , ILogger<AccountController> logger)
        {
            _userManager = userManager; // Get user from database/
            _signInManager = signInManager; // check Authentication
            _tokenService = tokenService;
            _mapper = mapper;
            _logger = logger;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrnetUser()
        {
            var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);
            return new UserDto
            {
                Email = user.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            var user = await _userManager.FindByEmailWithAddress(HttpContext.User);

             //user.Address it will be null because it is navigation property so if you not include it shold be null
             return _mapper.Map<Address , AddressDto>(user.Address);
        }
        
        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address)
        {
            var user = await _userManager.FindByEmailWithAddress(HttpContext.User);

            user.Address = _mapper.Map<AddressDto , Address>(address);

            // var userJson = JsonSerializer.Serialize(user , new JsonSerializerOptions { WriteIndented = true });
            // Console.WriteLine(userJson);

            var result = await _userManager.UpdateAsync(user);

            if(!result.Succeeded) return BadRequest("Problem updating the user");

            return Ok(_mapper.Map<Address , AddressDto>(user.Address));
        }
 
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if(user == null) return Unauthorized(new ApiResponse(401));

            var result = await _signInManager.CheckPasswordSignInAsync(user , loginDto.Password , false);

            if(!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto
            {
                Email = loginDto.Email,
                Token = _tokenService.CreateToken(user),
                DisplayName = user.DisplayName
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (CheckEmailExistAsync(registerDto.Email).Result.Value)
            {
                return BadRequest(new ApiValidationErrors{Errors = new []
                {
                     "Email address is in user"
                }});
            }
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };
            var result = await _userManager.CreateAsync(user , registerDto.Password);

            if(!result.Succeeded) return BadRequest(new ApiResponse(400));

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                Email = user.Email
            };
        }


    }
}