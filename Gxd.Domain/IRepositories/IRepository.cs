using System.Collections.Generic;

using Gxd.Core;
using System.Data;

namespace Gxd.Domain
{
    /// <summary>
    /// 实体仓储模型的数据基本操作
    /// </summary>
    /// <typeparam name="TEntity">实体类型</typeparam>
    /// <typeparam name="TKey">主键类型</typeparam>
    public interface IRepository<TEntity,TKey>: IDependency where TEntity : EntityBase<TKey>
    {
        #region 属性

        #endregion

        #region 方法
        /// <summary>
        /// 通过主键Id获取实体类信息
        /// </summary>
        /// <param name="id">实体主键</param>
        /// <returns>符合主键的实体，不存在时返回null</returns>
        TEntity Find(TKey id);

        /// <summary>
        /// 通过sql和参数获取实体信息列表
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <param name="param">匿名参数列表</param>
        /// <param name="transaction">事务</param>
        /// <param name="buffered">缓冲</param>
        /// <param name="commandTimeout">过期时间</param>
        /// <param name="commandType">执行类型</param>
        /// <returns></returns>
        IList<TEntity> Query(string sql, object param = null, IDbTransaction transaction = null, bool buffered = true, int? commandTimeout = null, CommandType? commandType = null);
        int Execute(string sql, object param = null, IDbTransaction transaction = null, int? commandTimeout = null, CommandType? commandType = null);
        long Add(TEntity model);
        List<TEntity> Add(IList<TEntity> modeList);
        void Update(TEntity model);
        void Update(IList<TEntity> modeList);
        
        void Remove(int id);
        void Remove(TEntity model);
        TEntity QueryFirst(object sqlParas);
        TEntity QueryFirst(string sql, object sqlParas);

        
        
        IList<TEntity> Query(object sqlParas, int pageSize, int pageIndex);
        #endregion

    }
}
