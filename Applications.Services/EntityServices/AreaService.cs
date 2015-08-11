using Application.Domain;
using Gxd.Domain;
using Gxd.Domain.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service
{
    public class AreaService : ServiceBase, IAreaContract
    {
        private readonly ICommunityRepository _areaRepository;

        public AreaService(IUnitOfWork unitOfWork, ICommunityRepository areaRepository)
            : base(unitOfWork)
        {
            _areaRepository = areaRepository;
        }

        /// <summary>
        /// 通过主键Id获取实体类信息
        /// </summary>
        /// <param name="id">实体主键</param>
        /// <returns>符合主键的实体，不存在时返回null</returns>
        public Community GetByKey(int id)
        {
            return _areaRepository.Find(id);
        }
        /// <summary>
        /// 获取 
        /// </summary>
        public IList<Community> Communities(string sql, object par)
        {
            return _areaRepository.Query(sql, par);
        }
    }
}
