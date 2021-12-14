using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Abstraction;

namespace WebAPI.Models
{
    public class User : Person
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public byte[] Password { get; set; }

        public byte[] PasswordKey { get; set; }

        [Required]
        public string Email { get; set; }
        [Required]
        public string Mobile { get; set; }

        [Required]
        public bool IsAdministrator { get; set; }

        

    }
}
