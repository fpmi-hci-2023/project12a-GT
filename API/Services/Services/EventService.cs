using AutoMapper;
using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
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
        Task<EventDTO> CreateEventAsync(EventCreateDTO eventDTO);
        Task<EventDTO> SubscribeUnsubscribeEventAsync(int userId, int eventId);
        Task<List<EventDTO>> GetEventsAsync(int page);
    }

    public class EventService : IEventService
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;
        public EventService(DataContext dataContext, IMapper mapper)
        {
            this.dataContext = dataContext;
            this.mapper = mapper;
        }

        public async Task<EventDTO> CreateEventAsync(EventCreateDTO eventDTO)
        {
            Event eventEntity = mapper.Map<Event>(eventDTO);

            User? user = await dataContext.users.FirstOrDefaultAsync(u => u.Id == eventDTO.AuthorId);

            if (user == null) throw new Exception("no such user");

            await dataContext.events.AddAsync(eventEntity);
            eventEntity.Author = user;
            await dataContext.SaveChangesAsync();

            return mapper.Map<EventDTO>(eventEntity);
        }

        public async Task<List<EventDTO>> GetEventsAsync(int page)
        {
            const int pageSize = 15;
            return mapper.Map<List<EventDTO>>(
                await dataContext.events
                    .Include(e => e.Users)
                    .Include(e => e.Author)
                    .OrderBy(_ => _.Id).Skip(pageSize * page).Take(pageSize)
                    .ToListAsync());
        }

        public async Task<EventDTO> SubscribeUnsubscribeEventAsync(int userId, int eventId)
        {
            var eventEntity = await dataContext.events
                .Include(e => e.Users)
                .Include(e => e.Author)
                .FirstOrDefaultAsync(e => e.Id == eventId);
            var user = await dataContext.users
                .Include(u => u.EventsCreated)
                .Include(u => u.EventsSubscribed)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null || eventEntity == null) throw new Exception("no such user or post");

            if(!user.EventsSubscribed.Contains(eventEntity))
            {
                eventEntity.Users.Add(user);
            }
            else
            {
                eventEntity.Users.Remove(user);
                user.EventsSubscribed.Remove(eventEntity);
            }
            await dataContext.SaveChangesAsync();

            return mapper.Map<EventDTO>(eventEntity);
        }
    }
}
