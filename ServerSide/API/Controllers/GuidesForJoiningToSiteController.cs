using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace API.Controllers
{
    [RoutePrefix("api/GuidesForJoiningToSite")]
    public class GuidesForJoiningToSiteController : ApiController
    {
        Trips_DB DB = new Trips_DB();

        [HttpGet]
        [Route("GetAllGuide")]
        public IEnumerable<GuidesForJoiningToSite> GetAllGuides()
        {
            List<GuidesForJoiningToSite> guideJoining = new List<GuidesForJoiningToSite>();
            guideJoining = DB.GuidesForJoiningToSite.ToList();
            //foreach (var item in guideJoining)
            //{
            //    item.password = "";
            //}
            return guideJoining;
        }

        [HttpGet]
        [Route("GetGuidesById/{id}")]
        public IHttpActionResult GetGuidesById(int id)
        {
            GuidesForJoiningToSite guide = DB.GuidesForJoiningToSite.Find(id);
            if (guide == null)
                return NotFound();
            guide.password = "";
            return Ok(guide);
        }

        [HttpPost]
        // [Route("AddGuide")]
        //[ResponseType(typeof(GuidesForJoiningToSite))]
        public IHttpActionResult PostAddGuide(GuidesForJoiningToSite guide)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            DB.GuidesForJoiningToSite.Add(guide);
            DB.SaveChanges();
            guide.password = "";
            return CreatedAtRoute("DefaultApi", new { id = guide.id }, guide);
        }
        [HttpPost]
        [Route("AddGuideForSite")]
        public IHttpActionResult AddGuideForSite(GuidesForJoiningToSite guide)
        {
            if (guide == null)
                return null;
            DB.GuidesForJoiningToSite.Add(guide);
            DB.SaveChanges();
            guide.password = "";
            return CreatedAtRoute("AddGuideForSite", new { id = guide.id }, guide);
        }
        [HttpDelete]
        [Route("DeleteGuide/{id}")]
        public IHttpActionResult DeleteGuide(int id)
        {
            GuidesForJoiningToSite guide = DB.GuidesForJoiningToSite.Find(id);
            if (guide == null)
                return NotFound();
            DB.GuidesForJoiningToSite.Remove(guide);
            DB.SaveChanges();
            return Ok();
        }
    }
}