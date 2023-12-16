using Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Services.Services;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Eventontroller : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IEventService eventService;

        public Eventontroller(ILogger<UserController> logger, IEventService eventService)
        {
            _logger = logger;
            this.eventService = eventService;
        }

        [HttpGet]
        public async Task<User> Get(string password, string username)
        {
            return await eventService.GetEventsAsync(password, username);
        }
    }
}