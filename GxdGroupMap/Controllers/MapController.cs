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
        //private readonly IAreaContract sAreaContract;
        //public MapController(IAreaContract pAreaContract)
        //{
        //    sAreaContract = pAreaContract;
        //}
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
            return View();
        }

        /// <summary>
        /// 各分类指数
        /// </summary>
        /// <param name="models"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult QueryCommunity([ModelBinder(typeof(JsonBinder<ComDto>))] ComDto models)
        {            
            string commandText = @"SELECT * FROM b_community";
            IList<Community> comList = sAreaContract.Communities(commandText, null);
            return Json(comList);
        }
    }
}