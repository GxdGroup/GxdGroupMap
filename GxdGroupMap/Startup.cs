using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(GxdGroupMap.Startup))]
namespace GxdGroupMap
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
