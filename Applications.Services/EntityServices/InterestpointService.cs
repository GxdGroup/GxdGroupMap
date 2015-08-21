using Application.Domain;
using Application.Domain.Common;
using Gxd.Domain;
using Gxd.Domain.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service
{
    public class InterestpointService : ServiceBase, IInterestpointContract
    {
        private readonly IInterestpointRepository _interestpointRepository;

        public InterestpointService(IUnitOfWork unitOfWork, IInterestpointRepository interestpointRepository)
            : base(unitOfWork)
        {
            _interestpointRepository = interestpointRepository;
        }

        /// <summary>
        /// 通过主键Id获取实体类信息
        /// </summary>
        /// <param name="id">实体主键</param>
        /// <returns>符合主键的实体，不存在时返回null</returns>
       
        /// <summary>
        /// 获取 
        /// </summary>
        public IList<Interestpoint> Interestpoints(string sql, object par)
        {
            return _interestpointRepository.Query(sql, par);
        }

     
    }
}