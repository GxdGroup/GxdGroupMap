using Application.Domain;
using Application.Domain.Common.Dto;
using Application.Service;
using Gxd.Domain;
using Gxd.Utility;
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
        private readonly IAreaCheckContract sAreaCheckContract;
        public MapController(IAreaContract pAreaContract, IInterestpointContract pInterestpointContract, IAreaCheckContract pAreaCheckContract)
        {
            sAreaContract = pAreaContract;
            sInterestpointContract = pInterestpointContract;
            sAreaCheckContract = pAreaCheckContract;
        }
        // GET: Map
        public ActionResult Index()
        {
            string commandText = @"SELECT * FROM b_areacheck";
            List<AreaCheck> s = sAreaCheckContract.AreaChecks(commandText, null).ToList();
            return View();
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
            sInterestpointContract.Interestpoints(commandText, null);
            return View();
        }

        [HttpPost]
        public ActionResult QueryCommunity([ModelBinder(typeof(JsonBinder<ComDto>))] ComDto models)
        {
            string commandText = @"SELECT * FROM b_community";
            IList<Community> comList = sAreaContract.Communities(commandText, null);
            return Json(comList);
        }
        public ActionResult QueryInterestpoint([ModelBinder(typeof(JsonBinder<ComDto>))] ComDto models)
        {
            string commandText = string.Format("SELECT * FROM b_interestpoint where Type='{0}'", models.Type);
            IList<Interestpoint> comList = sInterestpointContract.Interestpoints(commandText, null);
            return Json(comList);
        }

        [HttpPost]
        public ActionResult QueryArea([ModelBinder(typeof(JsonBinder<AreaDto>))] AreaDto models)
        {
            string commandText = "";
            if (models.AreaType == 0)
            {
                commandText = string.Format("SELECT * FROM b_areacheck where len(区划代码)={0}", 2);
            }
            else if (models.AreaType == 1)
            {
                commandText = string.Format("SELECT * FROM b_areacheck where len(区划代码)={0} and left(区划代码,2)={1}", 4, models.QHDM);
            }
            else if (models.AreaType == 2)
            {
                commandText = string.Format("SELECT * FROM b_areacheck where len(区划代码)={0} and left(区划代码,4)={1}", 6, models.QHDM);
            }

            IList<AreaCheck> areaList = sAreaCheckContract.AreaChecks(commandText, null);
            return Json(areaList);
        }

        [HttpPost]
        public ActionResult GetAreaByQHDM([ModelBinder(typeof(JsonBinder<GetAreaDto>))] GetAreaDto models)
        {
            string commandText = "";
            commandText = string.Format("SELECT * FROM b_areacheck where 区划代码={0}", models.QHDM);

            IList<AreaCheck> areaList = sAreaCheckContract.AreaChecks(commandText, null);
            AreaCheck area = areaList.FirstOrDefault();           

            return Json(area);
        }
        public ActionResult BaiduMap()
        {
            return View();
        }
        public ActionResult Test()
        {
            return View();
        }
    }
}