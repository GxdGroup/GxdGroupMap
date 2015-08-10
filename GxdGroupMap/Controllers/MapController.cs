using Applications.Services;
using Gxd.Domain;
using Gxd.Models;
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
        public MapController(IAreaContract pAreaContract)
        {
            sAreaContract = pAreaContract;
        }
        // GET: Map
        public ActionResult Index()
        {
            //int id = sAreaService.Count();
            int Id = 1;
            string commandText = @"SELECT * FROM b_community where Id = @Id";
            //Community comlists = DbHelper.QueryOne<Community>(commandText, new { Id = Id }, null, true, null, System.Data.CommandType.Text);
            IList<Community> _comlists = sAreaContract.Communities(commandText, new { Id = Id });

            return View();
        }


    }
}