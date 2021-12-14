using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IReviewRepository
    {
        Task<List<Review>> GetReviewsAsync(int articleId);
        void AddReview(Review review);
    }
}
