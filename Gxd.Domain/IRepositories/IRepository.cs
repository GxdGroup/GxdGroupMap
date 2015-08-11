using Gxd.Core;
using Gxd.Domain.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gxd.Domain
{
    public interface IRepository<TEntity,TKey>: IDependency where TEntity : EntityBase<TKey>
    {
        TEntity Add(TEntity model);
        List<TEntity> Add(IList<TEntity> modeList);
        void Update(TEntity model);
        void Update(IList<TEntity> modeList);
        TEntity Find(int id);
        void Remove(int id);
        void Remove(TEntity model);
        TEntity QueryFirst(object sqlParas);
        TEntity QueryFirst(string sql, object sqlParas);
        IList<TEntity> Query(object sqlParas);
        IList<TEntity> Query(string sql, object sqlParas);
        IList<TEntity> Query(object sqlParas, int pageSize, int pageIndex);
    }
}
