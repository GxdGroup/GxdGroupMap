using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Domain
{
    public class Community
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Lng { get; set; }
        public double Lat { get; set; }
    }
}
