using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Article : BaseEntity
    {
        [Required]
        public string Content { get; set; }
        [Required]
        public string Title { get; set; }

        public int JournalistId { get; set; }
        public Journalist Journalist { get; set; }

        public ICollection<Review> Review { get; set; }
        public Photo Photo { get; set; }

        
    }
}
