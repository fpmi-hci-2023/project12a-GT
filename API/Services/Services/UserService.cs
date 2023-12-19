

using AutoMapper;
using Data;
using Data.Entities;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Services.DTOs;

namespace Services.Services
{
    public interface IUserService
    {
        Task<UserDTO> GetUserAsync(string password, string username);
        Task<UserDTO> GetUserbyIdAsync(int id);
        Task<UserDTO> RegisterUserAsync(UserCreateDTO userDTO);
    }

    public class UserService : IUserService
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;
        public UserService(DataContext dataContext, IMapper mapper)
        {
            this.dataContext = dataContext;
            this.mapper = mapper;
        }

        public async Task<UserDTO> GetUserAsync(string password, string username)
        {
            var user = await dataContext.users
                .Include(u => u.EventsCreated)
                .Include(u => u.EventsSubscribed)
                .FirstOrDefaultAsync(u => u.Username == username && u.Password == password);

            return mapper.Map<UserDTO>(user);
        }

        public async Task<UserDTO> GetUserbyIdAsync(int id)
        {
            return mapper.Map<UserDTO>(await dataContext.users.FirstOrDefaultAsync(u => u.Id == id));
        }

        public async Task<UserDTO> RegisterUserAsync(UserCreateDTO userDTO)
        {
            User user = mapper.Map<User>(userDTO);

            await dataContext.users.AddAsync(user);
            await dataContext.SaveChangesAsync();

            return mapper.Map<UserDTO>(user);
        }
    }
}
