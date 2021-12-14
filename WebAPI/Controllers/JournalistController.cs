using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Interfaces;

namespace WebAPI.Controllers
{
    
    public class JournalistController : BaseController
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public JournalistController(IUnitOfWork unitOfWork,
                                    IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        [HttpGet("list")]
        [AllowAnonymous]
        public async Task<IActionResult> GetJournalists()
        {
            var journalists = await unitOfWork.JournalistRepository.GetJournalistsAsync();
            var journalistsDto = mapper.Map<IEnumerable<KeyValuePairDto>>(journalists);
            return Ok(journalistsDto);
        }

        
    }
}
