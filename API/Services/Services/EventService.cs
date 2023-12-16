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
        Task<EventDTO> GetEventsAsync(string password, string username);
    }

    public class EventService : IEventService
    {
        public EventService()
        {

        }

        public Task<EventDTO> GetEventsAsync(string password, string username)
        {
            throw new NotImplementedException();
        }
    }
}
