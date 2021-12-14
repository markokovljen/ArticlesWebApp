﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class LoginResponseDto
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public bool IsAdministrator { get; set; }
    }
}
