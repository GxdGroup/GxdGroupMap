using Application;
using Application.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Data.Dapper.Repositories
{
    /// <summary>
    /// 地区仓储
    /// </summary>
    public class CommunityRepository : RepositoryBase<Community>, ICommunityRepository
    {
        /// <summary>
        /// 初始化地区仓储
        /// </summary>
        /// <param name="unitOfWork">工作单元</param>
        public CommunityRepository(IApplicationUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}

