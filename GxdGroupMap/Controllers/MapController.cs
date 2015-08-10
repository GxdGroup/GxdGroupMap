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
        // GET: Map
        public ActionResult Index()
        {
            int Id = 1;
            string commandText = @"SELECT * FROM b_community where Id = @Id";
            IEnumerable<Community> comlists = DbHelper.Query<Community>(commandText, new { Id = Id }, null);
            List<Community> _comlists = comlists.ToList<Community>();
            return View();
        }


    }
}