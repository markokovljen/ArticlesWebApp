using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Dtos;
using WebAPI.Models;

namespace WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Article, ArticleListDto>()
                .ForMember(d => d.Journalist,
                           opt => opt.MapFrom(src => src.Journalist.FirstName + " " + src.Journalist.LastName))
                .ReverseMap();

            CreateMap<Article, ArticleDto>().ReverseMap();

            CreateMap<Journalist, KeyValuePairDto>()
                .ForMember(d=>d.FullName,
                opt=>opt.MapFrom(src=>src.FirstName+ " " + src.LastName)).ReverseMap();

            CreateMap<Article, ArticleDetailDto>()
                .ForMember(d=>d.Journalist,
                opt=>opt.MapFrom(src=>src.Journalist.FirstName + " "+src.Journalist.LastName))
                .ReverseMap();

            CreateMap<Article, ArticleUpdateDto>().ReverseMap();

            CreateMap<Review, ReviewListDto>().ReverseMap();

            CreateMap<Review, ReviewDto>().ReverseMap();

            CreateMap<Photo, PhotoDto>().ReverseMap();



        }
       
    }
}
