using Application.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Data.Dapper.Repositories
{
    public class InterestpointRepository : RepositoryBase<Interestpoint>, IInterestpointRepository
    {
        /// <summary>
        /// 初始化地区仓储
        /// </summary>
        /// <param name="unitOfWork">工作单元</param>
        public InterestpointRepository(IApplicationUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }
    }
}
