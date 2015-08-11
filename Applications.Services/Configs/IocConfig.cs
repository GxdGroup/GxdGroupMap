using Autofac;
using Gxd.Domain;
using Gxd.Domain.DBContext;
using Gxd.Domain.Repository;
using Gxd.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Applications.Services
{
    /// <summary>
    /// 应用程序Ioc配置
    /// </summary>
    public class IocConfig : Gxd.DI.Autofac.ConfigBase
    {
        /// <summary>
        /// 加载配置
        /// </summary>
        protected override void Load(ContainerBuilder builder)
        {
            //builder.RegisterType<RepositoryContext>().As<IRepositoryContext>().InstancePerLifetimeScope();
            builder.RegisterGeneric(typeof(Repository<>)).As(typeof(IRepository<>));
        }
    }
}
