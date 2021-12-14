using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Dtos
{
    public class ReviewDto
    {
        [Required]
        public string ReviewContent { get; set; }

        [Required]
        public int ArticleId { get; set; }
    }
}
