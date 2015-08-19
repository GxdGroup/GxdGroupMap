using Dapper.Contrib.Extensions;
using Gxd.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Domain
{
    [Table("b_community")]
    public class Community : EntityBase<int>
    {
        public string Name { get; set; }
        public double Lng { get; set; }
        public double Lat { get; set; }
        public string Picurl { get; set; }
        public string Address { get; set; }

    }
}
