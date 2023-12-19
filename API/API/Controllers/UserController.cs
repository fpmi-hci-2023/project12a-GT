using Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Services.DTOs;
using Services.Services;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            this.userService = userService;
        }

        [HttpGet]
        public async Task<UserDTO> Get(string password, string username)
        {
            return await userService.GetUserAsync(password, username);
        }

        [HttpGet("{id}")]
        public async Task<UserDTO> GetId(int id)
        {
            return await userService.GetUserbyIdAsync(id);
        }

        [HttpPost("resgister")]
        public async Task<UserDTO> Register([FromBody] UserCreateDTO userDTO)
        {
            return await userService.RegisterUserAsync(userDTO);
        }
    }
}