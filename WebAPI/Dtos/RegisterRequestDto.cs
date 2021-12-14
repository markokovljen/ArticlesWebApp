using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class RegisterRequestDto
    {
        [Required(ErrorMessage = "Username is mandatory field")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Username is mandatory field")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "Username is mandatory field")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password is mandatory field")]
        [StringLength(50, MinimumLength = 8)]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm password is mandatory field")]
        [StringLength(50, MinimumLength = 8)]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "Email is mandatory field")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Mobile is mandatory field")]
       // [RegularExpression("^[0][6][1-4][0-9]{9}$", ErrorMessage = "Only serbian phone numbers are allowed")]
        public string Mobile { get; set; }

        public bool isAdministrator { get; set; }
    }
}
