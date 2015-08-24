using Application.Domain;
using Application.Domain.Common.Dto;
using Application.Service;
using Gxd.Domain;
using Gxd.Web.Mvc.Binders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GxdGroupMap.Controllers
{
    public class MapController : Controller
    {
        private readonly IAreaContract sAreaContract;
        private readonly IInterestpointContract sInterestpointContract;
        public MapController(IAreaContract pAreaContract, IInterestpointContract pInterestpointContract)
        {
            sAreaContract = pAreaContract;
            sInterestpointContract = pInterestpointContract;
        }
        // GET: Map
        public ActionResult Index()
        {
            //int Id = 1;
            ////string commandText = @"SELECT * FROM b_community where Id = @Id";            
            ////IEnumerable<Community> _comlists = sAreaContract.Communities(commandText, new { Id = Id });

            //Community com = new Community();
            //Community com1 = new Community();
            //com.Lng = 112.546;
            //com.Lat = 38.789;
            //com.Name = "环球中心";

            //com1.Lng = 112.546;
            //com1.Lat = 38.789;
            //com1.Name = "环球中心1";


            //long id = sAreaContract.Add(com);
            //long _id = sAreaContract.Add(com1);

            return View();
        }

        public ActionResult Default()
        {
            string commandText = @"SELECT * FROM b_interestpoint";
            sInterestpointContract.Interestpoints(commandText,null);
            return View();
        }

        /// <summary>
        /// 各分类指数
        /// </summary>
        /// <param name="models"></param>
        /// <returns></returns>
        //[HttpPost]
        //public ActionResult QueryCommunity([ModelBinder(typeof(JsonBinder<ComDto>))] ComDto models)
        //{            
        //    string commandText = @"SELECT * FROM b_community";
        //    IList<Community> comList = sAreaContract.Communities(commandText, null);
        //    return Json(comList);
        //}
        public ActionResult QueryInterestpoint([ModelBinder(typeof(JsonBinder<ComDto>))] ComDto models)
        {
            string commandText =string.Format("SELECT * FROM b_interestpoint where Type='{0}'", models.Type);
            IList<Interestpoint> comList = sInterestpointContract.Interestpoints(commandText, null);
            return Json(comList);
        }
        public ActionResult BaiduMap()
        {
            return View();
        }
    }
}