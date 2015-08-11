﻿using Gxd.Domain;
using Gxd.Domain.Infrastructure;
using Gxd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Services
{
    public class AreaService : ServiceBase, IAreaContract
    {
        private readonly IRepository<Community> _areaRepository;

        public AreaService(IUnitOfWork unitOfWork,IRepository<Community> areaRepository)
            : base(unitOfWork)
        {
            _areaRepository = areaRepository;
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