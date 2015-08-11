using Applications.Domains;
using Gxd.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Services
{
    public interface IAreaContract: IDependency
    {
        IList<Community> Communities(string sql, object par);
    }
}
