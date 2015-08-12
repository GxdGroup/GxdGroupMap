using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Application.Service;
using Gxd.ApplicationServices;
using Application.Domain;
using Application.Data.Dapper;
using Application.Data.Dapper.Repositories;
using System.Collections.Generic;

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
            _areaContract = new AreaService(unitOfWork, communityReposity);
        }
        [TestMethod]
        public void TestMethod1()
        {
            int Id = 1;
            string commandText = @"SELECT * FROM b_community where Id = @Id";
            var community = _areaContract.Communities(commandText, new { Id = Id });
            Assert.AreEqual(1, community.Count);
        }
        [TestMethod]
        public void GetTEntityById()
        {
            int Id = 1;
            var com = _areaContract.GetByKey(Id);
            Assert.AreEqual("怡美家园", com.Name);
        }
        [TestMethod]
        public void QueryBySql()
        {
            int Id = 1;
            string commandText = @"SELECT * FROM b_community where Id = @Id";
            IList<Community> _comlists = _areaContract.Communities(commandText, new { Id = Id });
            Assert.AreEqual(1, _comlists.Count);
        }
        [TestMethod]
        public void Add()
        {
            Community com = new Community();
            com.Lng = 112.546;
            com.Lat = 38.789;
            com.Name = "环球中心";

            long id = _areaContract.Add(com);
            Assert.AreNotEqual(0, id);
        }
    }
}
