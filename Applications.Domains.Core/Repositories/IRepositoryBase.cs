using Gxd.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Domains
{
    public interface IRepositoryBase<T> : IRepository<T> where T: class
    {
    }
}
