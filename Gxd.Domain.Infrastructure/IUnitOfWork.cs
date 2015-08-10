using Gxd.Core;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gxd.Domain.Infrastructure
{
    public interface IUnitOfWork: IDependency
    {
        bool Committed { set; get; }
        IDbTransaction Tran { get; }
        void BeginTran();
        /// <summary>
        /// 提交当前的Unit Of Work事务。
        /// </summary>
        void Commit();
        /// <summary>
        /// 回滚当前的Unit Of Work事务。
        /// </summary>
        void Rollback();
    }
}

