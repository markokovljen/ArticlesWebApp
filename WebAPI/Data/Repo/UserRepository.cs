using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext dc;

        public UserRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public bool PasswordMatch(string password, string passwordConfirm)
        {
            return password == passwordConfirm;
        }

        public void Register(RegisterRequestDto registerRequest)
        {
            byte[] passwordHash, passwordKey;

            HashPassword(registerRequest.Password,out passwordHash, out passwordKey);

            User user = InitializeUser(registerRequest, passwordHash, passwordKey);

            dc.Users.Add(user);
        }

        private void HashPassword(string password,out byte[] passwordHash, out byte[] passwordKey)
        {
            using (var hmac = new HMACSHA512())//hmac ->hashbased message authetihation code
            {
                passwordKey = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private User InitializeUser(RegisterRequestDto registerRequest,
                                    byte[] passwordHash,byte[] passwordKey)
        {
            User user = new User();
            user.FirstName = registerRequest.FirstName;
            user.LastName = registerRequest.LastName;
            user.Username = registerRequest.Username;
            user.Password = passwordHash;
            user.PasswordKey = passwordKey;
            user.Email = registerRequest.Email;
            user.Mobile = registerRequest.Mobile;
            return user;
        }

        public async Task<bool> UserAlreadyExistsAsync(string userName)
        {
            return await dc.Users.AnyAsync(x => x.Username == userName);
        }

        public async Task<User> AuthenticateAsync(string username, string passwordText)
        {
            User user = await dc.Users.FirstOrDefaultAsync(x => x.Username == username);

            if (user == null || user.PasswordKey == null)
                return null;

            if (!MatchPasswordHash(passwordText, user.Password, user.PasswordKey))
                return null;

            return user;
        }

        private bool MatchPasswordHash(string passwordText, byte[] password, byte[] passwordKey)
        {
            using (var hmac = new HMACSHA512(passwordKey))//prosledjujemo passwordKey u konstruktor da
                                                          //nas passwordHash bude generisan sa istim kljucem
            {
                var passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(passwordText));
                for (int i = 0; i < passwordHash.Length; i++)
                {
                    if (passwordHash[i] != password[i]) //passwordhash i password imaju isti hash ako smo dobro unijeli
                        return false;                     //ako smo dobro unijeli lozinku
                }
                return true;
            }
        }

        public async Task<User> GetUserFromDbAsync(string username)
        {
            User user = await dc.Users.FirstOrDefaultAsync(x => x.Username == username);

            if (user == null)
                return null;

            return user;
        }

        
    }
}
