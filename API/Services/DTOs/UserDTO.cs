using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Avatar { get; set; }
        public List<EventDTO> eventsCreated { get; set; }
        public List<EventDTO> eventsSubscribed { get; set; }
        public string Description { get; set; }
    }
}
