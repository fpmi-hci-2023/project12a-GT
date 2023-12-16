

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
        Task<UserDTO> RegisterUserAsync(UserDTO userDTO);
        Task<UserDTO> UpdateUserAsync(UserDTO userDTO);
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
            var user = await dataContext.users.FirstOrDefaultAsync(u => u.Username == username && u.Password == password);

            return mapper.Map<UserDTO>(user);
        }

        public Task<UserDTO> RegisterUserAsync(UserDTO userDTO)
        {
            throw new NotImplementedException();
        }

        public Task<UserDTO> UpdateUserAsync(UserDTO userDTO)
        {
            throw new NotImplementedException();
        }
    }
}
