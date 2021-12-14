using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using WebAPI.Middlewares;

namespace WebAPI.Extensions
{
    public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app,
          IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }


        public static void ConfigureBuiltinExceptionHandler(this IApplicationBuilder app,
           IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //ovo korisniku daje sve informacije o Excpetion
                //mi ne zelimo da korisnik zna puno o Excpetionu zato smo zakomentarisali
            }
            else //znaci da smo u Production enviromentu (to stavljamo u launchSettings.json)
            {
                app.UseExceptionHandler(
                    options =>
                    {
                        options.Run(
                        async context =>
                        {
                            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                            var ex = context.Features.Get<IExceptionHandlerFeature>();
                            if (ex != null)
                            {
                                await context.Response.WriteAsync(ex.Error.Message);
                            }
                        }
                        );
                    }
                    );//ovaj middleware rukuje unhandle exceptionima
            }
        }
    }
}
