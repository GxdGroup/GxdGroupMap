using Application;
using Gxd.Domain.DBContext;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Data.Dapper
{
    /// <summary>
    /// 应用程序工作单元
    /// </summary>
    public class DapperUnitOfWork : RepositoryContext, IApplicationUnitOfWork
    {
        /// <summary>
        /// 初始化应用程序工作单元
        /// </summary>
        //static ApplicationUnitOfWork()
        //{
        //Database.SetInitializer<ApplicationUnitOfWork>(new CreateDatabaseIfNotExists<ApplicationUnitOfWork>());
        //Database.SetInitializer<ApplicationUnitOfWork>(null);
        //}

        /// <summary>
        /// 初始化应用程序工作单元
        /// </summary>
        public DapperUnitOfWork()
            : base(ConfigurationManager.ConnectionStrings["DbConnection"])
        { }
    }
}

