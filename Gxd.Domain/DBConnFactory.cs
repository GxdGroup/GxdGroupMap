using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gxd.Domain
{
    public class DBConnFactory
    {
        private ConnectionStringSettings connectionStringSettings = ConfigurationManager.ConnectionStrings["DbConnection"];
        private static DBConnFactory _instance;
        private DBConnFactory() { }
        public static DBConnFactory Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new DBConnFactory();
                }
                return _instance;
            }
        }
        public IDbConnection GetOpenConnection()
        {
            IDbConnection con = null;
            string dbType = connectionStringSettings.ProviderName.Trim();
            string connectionString = connectionStringSettings.ConnectionString;

            switch (dbType)
            {
                case "MySql":
                    //con = new MySql.Data.MySqlClient.MySqlConnection(connectionString);
                    break;
                case "System.Data.SqlClient":
                    con = new System.Data.SqlClient.SqlConnection(connectionString);
                    break;
                default:
                    break;
            }

            if (con == null)
            {
                throw new Exception("数据库连接配置不正确。");
            }

            return con;

        }

        public IDbConnection GetClosedConnection()
        {
            IDbConnection con = null;
            string dbType = connectionStringSettings.ProviderName.Trim();
            string connectionString = connectionStringSettings.ConnectionString;

            switch (dbType)
            {
                case "MySql":
                    //con = new MySql.Data.MySqlClient.MySqlConnection(connectionString);
                    break;
                case "SqlServer":
                    con = new System.Data.SqlClient.SqlConnection(connectionString);
                    break;
                default:
                    break;
            }

            if (con == null)
            {
                throw new Exception("数据库连接配置不正确。");
            }

            return con;

        }
    }
}
