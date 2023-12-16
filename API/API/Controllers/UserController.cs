using Data.Entities;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<User> Get(string password, string username)
        {
            return await userService.GetUserAsync(password, username);
        }
    }
}