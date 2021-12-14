using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Review : BaseEntity
    {
        [Required]
        public string ReviewContent { get; set; }

        [Required]
        public int ArticleId { get; set; }
        public Article Article { get; set; }
    }
}
