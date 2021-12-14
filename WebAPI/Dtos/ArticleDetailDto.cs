using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Dtos
{
    public class ArticleDetailDto : ArticleListDto
    {
        public string Content { get; set; }

        public ICollection<string> Reviews { get; set; }
        
    }
}
