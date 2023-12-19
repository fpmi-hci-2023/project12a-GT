using Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Services.DTOs;
using Services.Services;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IEventService eventService;

        public EventController(ILogger<UserController> logger, IEventService eventService)
        {
            _logger = logger;
            this.eventService = eventService;
        }

        [HttpGet]
        public async Task<List<EventDTO>> Get(int page)
        {
            return await eventService.GetEventsAsync(page);
        }

        [HttpGet("subs")]
        public async Task<EventDTO> SubscribeUnsubscribeEventAsync([FromQuery]int userId, int eventId)
        {
            return await eventService.SubscribeUnsubscribeEventAsync(userId, eventId);
        }

        [HttpPost]
        public async Task<EventDTO> Create([FromBody] EventCreateDTO eventDTO)
        {
            return await eventService.CreateEventAsync(eventDTO);
        }
    }
}