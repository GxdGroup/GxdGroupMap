using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Gxd.Domain.Infrastructure;

namespace Gxd.Domain.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected IRepositoryContext Context;
        protected IDbConnection Conn;

        public Repository(IRepositoryContext context)
        {
            Context = context;
            Conn = Context.Conn;
        }      

        public List<T> Add(IList<T> modeList)
        {
            throw new NotImplementedException();
        }

        public T Add(T model)
        {
            throw new NotImplementedException();
        }

        public T Find(int id)
        {
            throw new NotImplementedException();
        }

        public IList<T> Query(object sqlParas)
        {
            throw new NotImplementedException();
        }

        public IList<T> Query(string sql, object sqlParas)
        {
            return Conn.Query<T>(sql, sqlParas).ToList();
        }

        public IList<T> Query(object sqlParas, int pageSize, int pageIndex)
        {
            throw new NotImplementedException();
        }

        public T QueryFirst(object sqlParas)
        {
            throw new NotImplementedException();
        }

        public T QueryFirst(string sql, object sqlParas)
        {
            throw new NotImplementedException();
        }

        public void Remove(T model)
        {
            throw new NotImplementedException();
        }

        public void Remove(int id)
        {
            throw new NotImplementedException();
        }

        public void Update(IList<T> modeList)
        {
            throw new NotImplementedException();
        }

        public void Update(T model)
        {
            throw new NotImplementedException();
        }
    }
}
