

using Data;
using Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Services.Services
{
    public interface IUserService
    {
        Task<User> GetUserAsync(string password, string username);
    }

    public class UserService : IUserService
    {
        private readonly DataContext dataContext;
        public UserService(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task<User> GetUserAsync(string password, string username)
        {
            return await dataContext.users.FirstOrDefaultAsync(_ => _.Username == username && _.Password == password);
        }
    }
}
