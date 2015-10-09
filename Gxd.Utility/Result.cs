using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gxd.Utility
{
    public class Result<TEntity>
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public TEntity Content { get; set; }
    }
}
