using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Errors;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class ArticleController : BaseController
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;
        private readonly IPhotoService photoService;

        public ArticleController(IUnitOfWork unitOfWork,
                                 IMapper mapper,
                                 IPhotoService photoService)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.photoService = photoService;
        }

        [HttpGet("list")]
        [AllowAnonymous]
        public async Task<IActionResult> GetArticleList()
        {
            List<Article> articles = await unitOfWork.ArticleRepository.GetArticlesAsync();
            List<ArticleListDto> articleListDto = mapper.Map<List<ArticleListDto>>(articles);
         
            return Ok(articleListDto);
        }

        [HttpGet("detail/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetArticleDetail(int id)
        {
            Article article = await unitOfWork.ArticleRepository.GetArticleAsync(id);

            GenerateError(article);

            ArticleDetailDto articleDto = mapper.Map<ArticleDetailDto>(article);

            return Ok(articleDto);
        }



        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddArticle(ArticleDto articleDto)
        {
            Journalist journalist = await unitOfWork.JournalistRepository.JournalistExistsAsync(articleDto.JournalistId);

            GenerateError(journalist);
            

            Article article = mapper.Map<Article>(articleDto);
            article.Journalist = journalist;
            int userId = GetUserId();
            article.LastUpdatedBy = userId;

            unitOfWork.ArticleRepository.AddArticle(article);

            await unitOfWork.SaveAsync();

           // var actionName = "RetrieveValue";
            return Ok(article.Id);

        }

        [HttpDelete("delete/{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteArticle(int id)
        {
            bool articleDeleted = await unitOfWork.ArticleRepository.DeleteArticleAsync(id);

            if (!articleDeleted)
            {
                ApiError apiError = new ApiError(BadRequest().StatusCode,
                                                   "Invalid id for article",
                                                   "This error apear when provided article who does not exists");
                return BadRequest(apiError);
            }

            await unitOfWork.SaveAsync();

            return Ok();

        }

        [HttpPut("updateArticleContent/{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateArticle(int id,ArticleUpdateDto articleDto)
        {
            Article articleFromDb = await unitOfWork.ArticleRepository.GetArticleAsync(id);

            GenerateError(articleFromDb);

            int userId = GetUserId();
            articleFromDb.LastUpdatedBy = userId;
            mapper.Map(articleDto, articleFromDb);

            await unitOfWork.SaveAsync();

            return StatusCode(200);
        }

        [HttpGet("duplicateData")]
        [Authorize]
        
        public async Task<IActionResult> DuplicateDataArticle()
        {
            List<Article> articles = await unitOfWork.ArticleRepository.GetArticlesAsync();
            foreach(var item in articles)
            {
                item.Id = 0;
                unitOfWork.ArticleRepository.AddArticle(item);
            }

            await unitOfWork.SaveAsync();

            return StatusCode(201);

        }

        [HttpPost("add/photo/{articleId}")]
        [Authorize]
        public async Task<IActionResult> AddArticlePhoto(IFormFile file,int articleId)
        {
            if (file == null)
                return BadRequest("File is null");

            var result = await photoService.UploadPhotoAsync(file);
            if (result.Error != null)
                return BadRequest(result.Error.Message);

            Article article = await unitOfWork.ArticleRepository.GetArticleByIdAsync(articleId);
            GenerateError(article);

            var photo = new Photo
            {
                ImageUrl = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };


            article.Photo = photo;

            await unitOfWork.SaveAsync();

            return StatusCode(201);
        }

        
    }
}
