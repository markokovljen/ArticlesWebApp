using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IUserRepository
    {
        Task<User> AuthenticateAsync(string username, string passwordText);
        void Register(RegisterRequestDto registerRequest);
        Task<bool> UserAlreadyExistsAsync(string userName);
        bool PasswordMatch(string password, string passwordConfirm);
        Task<User> GetUserFromDbAsync(string username);
    }
}
