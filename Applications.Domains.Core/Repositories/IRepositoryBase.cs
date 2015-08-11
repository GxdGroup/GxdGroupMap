using Gxd.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Domain
{
    public interface IRepositoryBase<TEntity> : IRepository<TEntity,int> where TEntity : EntityBase<int>
    {
    }
}
