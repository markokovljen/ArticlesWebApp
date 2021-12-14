using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly DataContext dc;

        public ArticleRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public void AddArticle(Article article)
        {
            dc.Articles.Add(article);
        }

        public async Task<bool> DeleteArticleAsync(int articleId)
        {
            Article article = await dc.Articles.FindAsync(articleId);

            if (article == null)
                return false;

            dc.Articles.Remove(article);
            return true;
        }

        public async Task<List<Article>> GetArticlesAsync()
        {
            var articles = await dc.Articles
                         .Include(a => a.Journalist)
                         .Include(a => a.Review)
                         .Include(a => a.Photo)
                         .ToListAsync();
            
            return articles;
        }
        public async Task<Article> GetArticleAsync(int id)
        {
            Article article = await dc.Articles
                              .Include(a => a.Journalist)
                              .Include(a => a.Review)
                              .Include(a=>a.Photo)
                              .FirstOrDefaultAsync(a => a.Id == id);
            return article;
                                
        }

        public async Task<Article> GetArticleByIdAsync(int id)
        {
            Article article = await dc.Articles
                              .Include(a => a.Photo)
                              .FirstOrDefaultAsync(a => a.Id == id);
            return article;

        }






    }
}
