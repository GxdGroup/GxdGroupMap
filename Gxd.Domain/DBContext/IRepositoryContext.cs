using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gxd.Domain
{
    public interface IRepositoryContext : IDisposable
    {
        IDbConnection Conn { get; }
        void InitConnection();
    }
}
