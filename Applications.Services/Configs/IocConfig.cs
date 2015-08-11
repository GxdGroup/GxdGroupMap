using Application;
using Application.Data.Dapper;
using Autofac;


namespace Application.Service
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
            builder.RegisterType<DapperUnitOfWork>().As<IApplicationUnitOfWork>().InstancePerLifetimeScope();
            //builder.RegisterGeneric(typeof(Repository<>)).As(typeof(IRepository<>));
            //builder.RegisterGeneric(typeof(RepositoryBase<>)).As(typeof(IRepositoryBase<>));
        }
    }
}
