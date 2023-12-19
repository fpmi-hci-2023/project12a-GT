using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Services.Services;
using AutoMapper;
using WebCalc.Business.Helpers;
using System.Text.Json.Serialization;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {

            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("myAppCors", policy =>
                {
                    policy.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                });
            });

            // Add services to the container.
            builder.Services.AddSwaggerGen();
            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            }); ;

            builder.Services.AddDbContext<DataContext>(options =>
            {
                options.UseQueryTrackingBehavior(QueryTrackingBehavior.TrackAll);
                options.UseMySql(
                    builder.Configuration.GetConnectionString("DefaultConnection"),
                    ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection")),
                    o =>
                    {
                        o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);// TODO - set not globally
                        o.EnableRetryOnFailure();
                    });
            });

            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new BusinessAutoMapperProfile());
            });
            var mapper = mappingConfig.CreateMapper();
            builder.Services.AddSingleton(mapper);

            builder.Services.AddScoped<IEventService, EventService>();
            builder.Services.AddScoped<IUserService, UserService>();


            var app = builder.Build();

            app.UseCors("myAppCors");

            app.UseSwagger();
            app.UseSwaggerUI();
            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}