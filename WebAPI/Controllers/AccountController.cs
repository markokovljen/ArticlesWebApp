using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Errors;
using WebAPI.Extensions;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IConfiguration configuration;

        public AccountController(IUnitOfWork unitOfWork,
                                 IConfiguration configuration)
        {
            this.unitOfWork = unitOfWork;
            this.configuration = configuration;
        }


        //api/account/login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto loginRequestDto)
        {
            User user = await unitOfWork.UserRepository.AuthenticateAsync(loginRequestDto.Username,
                                                                     loginRequestDto.Password);
            if (user == null)
            {
                ApiError apiError = new ApiError(Unauthorized().StatusCode,
                                                   "Invalid User ID or Pass",
                                                   "This error apear when provided user id or password does not exists");
                return Unauthorized(apiError);
            }

            var loginResponse = new LoginResponseDto();

            loginResponse.Username = user.Username;
            loginResponse.IsAdministrator = user.IsAdministrator;
            loginResponse.Token = CreateJWT(user);

            return Ok(loginResponse);

        }

        private string CreateJWT(User user)
        {

            var secretKey = configuration.GetSection("AppSettings:Key").Value;

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(secretKey)); //simetricni kljuc(parametar je niz bajtova)(bice postavljen u app.settings)

            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name,user.Username),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
            }; //dio informacija o korisniku

            var signingCredentials = new SigningCredentials(
                    key, SecurityAlgorithms.HmacSha256Signature
            ); //ovde definisemo tajni kljuc i algoritam koji korstimo za signeture

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(10),
                SigningCredentials = signingCredentials,

            };//ovde dodajemo sve prethodno definisane informacije kako bismo mogli generisati token(ovde se moze jos puno info dodati) 

            var tokenHandler = new JwtSecurityTokenHandler();//on generise JWT

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token); //ovde radimo serijalizaciju u pravi format

        }


        //api/account/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequestDto registerRequest)
        {
            ApiError apiError = await ValidateRegisterRequest(registerRequest);

            if (apiError.ErrorCode == BadRequest().StatusCode)
                return BadRequest(apiError);

            unitOfWork.UserRepository.Register(registerRequest);

            await unitOfWork.SaveAsync();

            return StatusCode(201);
        }

        private async Task<ApiError> ValidateRegisterRequest(RegisterRequestDto registerRequest)
        {

            if (CheckFiledsAreEmpty(registerRequest))
            {
                return new ApiError(BadRequest().StatusCode,
                                       "You can not leave a blank filed for username or password",
                                       "");
            }
            else if (PasswordsMatches(registerRequest))
            {
                return new ApiError(BadRequest().StatusCode,
                                       "Passwords must match!",
                                       "");
            }
            else if (await CheckUserAlreadyExists(registerRequest))
            {
                return new ApiError(BadRequest().StatusCode,
                                        "User already exists, please try different user name",
                                        "");
            }
            else
            {
                return new ApiError();
            }
        }

        private bool CheckFiledsAreEmpty(RegisterRequestDto registerRequest)
        {
            return registerRequest.FirstName.IsEmpty() ||
                   registerRequest.LastName.IsEmpty() ||
                   registerRequest.Username.IsEmpty() ||
                   registerRequest.Mobile.IsEmpty() ||
                   registerRequest.Email.IsEmpty();
        }
        private bool PasswordsMatches(RegisterRequestDto registerRequest)
        {
            return !unitOfWork.UserRepository.
                PasswordMatch(registerRequest.Password, registerRequest.ConfirmPassword);
        }
        private async Task<bool> CheckUserAlreadyExists(RegisterRequestDto registerRequest)
        {
            return await unitOfWork.UserRepository.
               UserAlreadyExistsAsync(registerRequest.Username);
        }

        
        [HttpGet("user/{username}")]
        public async Task<IActionResult> GetUser(string username)
        { 
            User user = await unitOfWork.UserRepository.GetUserFromDbAsync(username);

            if (user == null)
            {
                ApiError apiError = new ApiError(Unauthorized().StatusCode,
                                                   "Invalid username",
                                                   "This error apear when provided user who does not exists");
                return Unauthorized(apiError);
            }

            ModifyUserDto modifyUser = new ModifyUserDto();
            modifyUser.FirstName = user.FirstName;
            modifyUser.LastName = user.LastName;

            return Ok(modifyUser);
        }

        [HttpPut("user/{username}")]
        public async Task<IActionResult> ModifyUser(string username,ModifyUserDto userRequest)
        {
            User userFromDb = await unitOfWork.UserRepository.GetUserFromDbAsync(username);

            if (userFromDb == null)
            {
                ApiError apiError = new ApiError(Unauthorized().StatusCode,
                                                   "Invalid username, modify not allowed",
                                                   "This error apear when provided user who does not exists");
                return BadRequest(apiError);
            }

            userFromDb.FirstName = userRequest.FirstName;
            userFromDb.LastName = userRequest.LastName;

            await unitOfWork.SaveAsync();

            return StatusCode(200);
            
        }


    }
}
