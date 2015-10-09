using Dapper.Contrib.Extensions;
using Gxd.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Domain
{
    [Table("b_areacheck")]
    public class AreaCheck : EntityBase<int>
    {
        public string 区划名称 { get; set; }
        public string 区划代码 { get; set; }
        public string 边界 { get; set; }
        public double 经度 { get; set; }
        public double 纬度 { get; set; }
        public int 展示级别 { get; set; }
        public string 简称 { get; set; }
        public bool 状态 { get; set;}
    }
}
