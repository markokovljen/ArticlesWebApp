using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Interfaces
{
    public interface IJournalistRepository
    {
        Task<List<Journalist>> GetJournalistsAsync();
        Task<Journalist> JournalistExistsAsync(int id);
    }
}
