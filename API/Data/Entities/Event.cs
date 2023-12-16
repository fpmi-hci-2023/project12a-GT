using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Entities
{
    public class Event
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime date { get; set; }
        public string Address { get; set; }
        public List<User> Users { get; set; }
        public int MaxUsers { get; set; }
        public User Author { get; set; }
    }
}
