using Data.Entities;
using Services.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public interface IEventService
    {
        Task<EventDTO> CreateEventAsync(EventDTO eventDTO);
        Task<EventDTO> GetEventsAsync(int page);
    }

    public class EventService : IEventService
    {
        public EventService()
        {

        }

        public Task<EventDTO> CreateEventAsync(EventDTO eventDTO)
        {
            throw new NotImplementedException();
        }

        public Task<EventDTO> GetEventsAsync(string password, string username)
        {
            throw new NotImplementedException();
        }

        public Task<EventDTO> GetEventsAsync(int page)
        {
            throw new NotImplementedException();
        }
    }
}
