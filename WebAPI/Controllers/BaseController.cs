using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebAPI.Errors;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected int GetUserId()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        }

        protected IActionResult GenerateError(object currentObject)
        {
            if (currentObject == null)
            {
                ApiError apiError = new ApiError(BadRequest().StatusCode,
                                                  "Invalid id for " + currentObject.GetType().Name,
                                                  "This error apear when provided" + currentObject.GetType().Name + " who does not exists");
                return BadRequest(apiError);
            }

            return null;

        }
    }
}
