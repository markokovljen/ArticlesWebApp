using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class ReviewRepository : IReviewRepository
    {
        private readonly DataContext dc;

        public ReviewRepository(DataContext dc)
        {
            this.dc = dc;
        }
        public void AddReview(Review review)
        {
            dc.Reviews.Add(review);
        }

        public async Task<List<Review>> GetReviewsAsync(int articleId)
        {
            return await dc.Reviews
                         .Where(r => r.ArticleId == articleId)
                         .ToListAsync();
        }
    }
}
