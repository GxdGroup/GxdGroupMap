﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Dapper;
namespace Gxd.Domain
{
    public sealed class DbHelper
    {
        private DbHelper() { }

        public static T QueryOne<T>(string sql, object param = null, IDbTransaction transaction = null, bool buffered = true, int? commandTimeout = null, CommandType? commandType = null) where T : class
        {
            var dataResult = Query<T>(sql, param, transaction, buffered, commandTimeout, commandType);
            return dataResult != null && dataResult.Count() > 0 ? dataResult.ToList<T>()[0] : null;
        }

        public static IEnumerable<T> Query<T>(string sql, object param = null, IDbTransaction transaction = null, bool buffered = true, int? commandTimeout = null, CommandType? commandType = null)
        {
            
            using (IDbConnection con = DBConnFactory.Instance.GetOpenConnection())                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            {
                con.Open();
                return con.Query<T>(sql, param, transaction, buffered, commandTimeout, commandType);
            }
        }
    }
}
