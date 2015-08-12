using Gxd.Domain.Infrastructure;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gxd.Domain.DBContext
{
    public class RepositoryContext : DisposableObject, IUnitOfWork, IRepositoryContext
    {
        private readonly ConnectionStringSettings _connectionSeting = ConfigurationManager.ConnectionStrings["DbConnection"];

        public RepositoryContext()
        {
            InitConnection();
        }

        public RepositoryContext(ConnectionStringSettings connectionSeting)
        {
            // TODO: Complete member initialization
            this._connectionSeting = connectionSeting;
            InitConnection();
        }

        public IDbConnection Conn { private set; get; }

        public void InitConnection()
        {
            DbProviderFactory dbfactory = DbProviderFactories.GetFactory(this._connectionSeting.ProviderName);
            this.Conn = dbfactory.CreateConnection();
            if (Conn != null) this.Conn.ConnectionString = this._connectionSeting.ConnectionString;
            Conn.Open();
        }

        private bool _committed = true;
        private readonly object _sync = new object();

        public bool Committed
        {
            set { _committed = value; }
            get { return _committed; }
        }
        public IDbTransaction Tran { private set; get; }
        public void BeginTran()
        {
            this.Tran = this.Conn.BeginTransaction();
            this.Committed = false;
        }

        public void Commit()
        {
            if (Committed) return;
            lock (_sync)
            {
                this.Tran.Rollback();
                this._committed = true;
            }
        }

        public void Rollback()
        {
            if (Committed) return;
            lock (_sync)
            {
                this.Tran.Rollback();
                this._committed = true;
            }
        }

        protected override void Dispose(bool disposing)
        {
            if (!disposing)
            {
                return;
            }
            if (this.Conn.State != ConnectionState.Open) return;
            Commit();
            this.Conn.Close();
            this.Conn.Dispose();
        }
    }
}

