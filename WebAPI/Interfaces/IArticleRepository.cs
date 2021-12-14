using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IArticleRepository
    {
        Task<List<Article>> GetArticlesAsync();
        Task<Article> GetArticleAsync(int id);
        void AddArticle(Article article);
        Task<bool> DeleteArticleAsync(int articleId);

        Task<Article> GetArticleByIdAsync(int articleId);
    }
}
