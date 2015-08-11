using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

using Gxd.Domain.Infrastructure;
using Gxd.Domain.DBContext;

using Dapper;
using Dapper.Contrib.Extensions;

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

        #region 方法

        /// <summary>
        /// 通过主键Id获取实体类信息
        /// </summary>
        /// <param name="id">实体主键</param>
        /// <returns>符合主键的实体，不存在时返回null</returns>
        public TEntity Find(TKey id)
        {
            return Conn.Get<TEntity>(id);
        }
        public List<TEntity> Add(IList<TEntity> modeList)
        {
            throw new NotImplementedException();
        }

        public TEntity Add(TEntity model)
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
        #endregion
    }
}
