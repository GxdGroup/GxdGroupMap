using Gxd.Core;
using Gxd.Domain.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gxd.Domain
{
    public interface IRepository<T>: IDependency where T : class
    {
        T Add(T model);
        List<T> Add(IList<T> modeList);
        void Update(T model);
        void Update(IList<T> modeList);
        T Find(int id);
        void Remove(int id);
        void Remove(T model);
        T QueryFirst(object sqlParas);
        T QueryFirst(string sql, object sqlParas);
        IList<T> Query(object sqlParas);
        IList<T> Query(string sql, object sqlParas);
        IList<T> Query(object sqlParas, int pageSize, int pageIndex);
    }
}
