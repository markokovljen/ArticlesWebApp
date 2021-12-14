using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IArticleRepository ArticleRepository { get; }
        IJournalistRepository JournalistRepository { get; }
        IReviewRepository ReviewRepository { get; }
        Task<bool> SaveAsync();
    }
}
