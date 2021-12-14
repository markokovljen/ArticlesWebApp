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
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class ReviewController : BaseController
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public ReviewController(IUnitOfWork unitOfWork,
                                IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        [HttpGet("list/{articleId}")]
        public async Task<IActionResult> GetReviewsList(int articleId)
        {
            List<Review> reviews = await unitOfWork.ReviewRepository.GetReviewsAsync(articleId);
            List<ReviewListDto> reviewListDto = mapper.Map<List<ReviewListDto>>(reviews);
           
            return Ok(reviewListDto);
        }

        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddReview(ReviewDto reviewDto)
        {
            Article article = await unitOfWork.ArticleRepository.GetArticleAsync(reviewDto.ArticleId);

            GenerateError(article);

            Review review = mapper.Map<Review>(reviewDto);
            review.Article = article;
            int userId = GetUserId();
            review.LastUpdatedBy = userId;

            unitOfWork.ReviewRepository.AddReview(review);
            await unitOfWork.SaveAsync();
            return StatusCode(201);
        }
    }
}
