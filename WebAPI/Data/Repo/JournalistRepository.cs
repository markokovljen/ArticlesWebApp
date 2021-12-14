using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Data.Repo
{
    public class JournalistRepository : IJournalistRepository
    {
        private readonly DataContext dc;

        public JournalistRepository(DataContext dc)
        {
            this.dc = dc;
        }

        public async Task<Journalist> JournalistExistsAsync(int id)
        {
            Journalist journalist = await dc.Journalists.FirstOrDefaultAsync(j => j.Id == id);
            if (journalist == null)
                return null;
            return journalist; 

        
        }

        public async Task<List<Journalist>> GetJournalistsAsync()
        {
            return await dc.Journalists.ToListAsync();
        }
    }
}
