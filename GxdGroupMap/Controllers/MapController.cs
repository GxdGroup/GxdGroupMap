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
        private readonly IAreaService sAreaService;
        public MapController(IAreaService pAreaContract)           
        {
            sAreaService = pAreaContract;
        }
        // GET: Map
        public ActionResult Index()
        {
            int id = sAreaService.Count();
            int Id = 1;
            string commandText = @"SELECT * FROM b_community where Id = @Id";
            Community comlists = DbHelper.QueryOne<Community>(commandText, new { Id = Id }, null, true, null, System.Data.CommandType.Text);
            //List<Community> _comlists = comlists.ToList<Community>();
            return View();
        }


    }
}