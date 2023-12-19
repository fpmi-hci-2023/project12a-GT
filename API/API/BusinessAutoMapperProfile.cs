using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using AutoMapper;
using Data.Entities;
using Services.DTOs;

namespace WebCalc.Business.Helpers;

public class BusinessAutoMapperProfile : Profile
{
    public BusinessAutoMapperProfile()
    {
       
        CreateMap<User, UserDTO>();
        CreateMap<User, UserForEventDTO>();
        CreateMap<UserCreateDTO, User>();
        CreateMap<Event, EventDTO>();
        CreateMap<EventCreateDTO, Event>();
    }
}