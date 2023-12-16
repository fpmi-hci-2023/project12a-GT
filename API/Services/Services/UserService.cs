

using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Services.DTOs;

namespace Services.Services
{
    public interface IUserService
    {
        Task<UserDTO> GetUserAsync(string password, string username);
        Task<UserDTO> UpdateUserAsync(UserDTO userDTO);
    }

    public class UserService : IUserService
    {
        private readonly DataContext dataContext;
        public UserService(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task<UserDTO> GetUserAsync(string password, string username)
        {
            return await dataContext.users.
                FirstOrDefaultAsync(_ => _.Username == username && _.Password == password);
        }

        public Task<UserDTO> UpdateUserAsync(UserDTO userDTO)
        {
            throw new NotImplementedException();
        }
    }
}
