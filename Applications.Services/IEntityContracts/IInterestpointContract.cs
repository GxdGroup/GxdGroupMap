using Application.Domain;
using Gxd.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service
{
    public interface IInterestpointContract : IDependency
    {
        /// <summary>
        /// 通过主键Id获取实体类信息
        /// </summary>
        /// <param name="id">实体主键</param>
        /// <returns>符合主键的实体，不存在时返回null</returns>
        //Community GetByKey(int id);
        IList<Interestpoint> Interestpoints(string sql, object par);        
    }
}
