using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Abstraction;

namespace WebAPI.Models
{
    public class Journalist : Person
    {
        public ICollection<Article> Article { get; set; }
    }
}
