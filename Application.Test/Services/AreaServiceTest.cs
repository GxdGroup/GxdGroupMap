using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Application.Service;
using Gxd.ApplicationServices;
using Application.Domain;
using Application.Data.Dapper;
using Application.Data.Dapper.Repositories;

namespace Application.Test.Services
{
    [TestClass]
    public class AreaServiceTest
    {
        IAreaContract _areaContract;
        /// <summary>
        /// 测试初始化
        /// </summary>
        [TestInitialize]
        public void TestInit()
        {
            IApplicationUnitOfWork unitOfWork = new DapperUnitOfWork();
            ICommunityRepository communityReposity = new CommunityRepository(unitOfWork);
             _areaContract=new AreaService(unitOfWork, communityReposity);            
        }
        [TestMethod]
        public void TestMethod1()
        {
            int Id = 1;
            string commandText = @"SELECT * FROM b_community where Id = @Id";
            var community = _areaContract.Communities(commandText, new { Id = Id });
            Assert.AreEqual(1, community.Count);
        }
    }
}
