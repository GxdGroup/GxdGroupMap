using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Gxd.Domain.Infrastructure;
using Gxd.Domain.DBContext;

namespace Gxd.Domain.Repository
{
    public class Repository<TEntity, TKey> : IRepository<TEntity, TKey> where TEntity : EntityBase<TKey>
    {
        protected IRepositoryContext Context;
        protected IDbConnection Conn;

        public Repository(IUnitOfWork context)
        {
            Context = (RepositoryContext)context;
            Conn = Context.Conn;
        }      

        public List<TEntity> Add(IList<TEntity> modeList)
        {
            throw new NotImplementedException();
        }

        public TEntity Add(TEntity model)
        {
            throw new NotImplementedException();
        }

        public TEntity Find(int id)
        {
            throw new NotImplementedException();
        }

        public IList<TEntity> Query(object sqlParas)
        {
            throw new NotImplementedException();
        }

        public IList<TEntity> Query(string sql, object sqlParas)
        {
            return Conn.Query<TEntity>(sql, sqlParas).ToList();
        }

        public IList<TEntity> Query(object sqlParas, int pageSize, int pageIndex)
        {
            throw new NotImplementedException();
        }

        public TEntity QueryFirst(object sqlParas)
        {
            throw new NotImplementedException();
        }

        public TEntity QueryFirst(string sql, object sqlParas)
        {
            throw new NotImplementedException();
        }

        public void Remove(TEntity model)
        {
            throw new NotImplementedException();
        }

        public void Remove(int id)
        {
            throw new NotImplementedException();
        }

        public void Update(IList<TEntity> modeList)
        {
            throw new NotImplementedException();
        }

        public void Update(TEntity model)
        {
            throw new NotImplementedException();
        }
    }
}
