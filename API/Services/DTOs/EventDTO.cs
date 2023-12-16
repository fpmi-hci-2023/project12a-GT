using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DTOs
{
    public class EventDTO
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime date { get; set; }
        public string Address { get; set; }
        public List<UserDTO> Users { get; set; }
        public int MaxUsers { get; set; }
        public UserDTO Author { get; set; }
    }
}
