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
    [RoutePrefix("api/attractionsForAgree")]
    public class AttractionsForAgreeController : ApiController
    {
        Trips_DB DB = new Trips_DB();

        [HttpPost]
        [Route("PostAddAttraction", Name = "PostAddAttraction")]
        public IHttpActionResult PostAddAttraction(WaitingAttractions attraction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            DB.WaitingAttractions.Add(attraction);
            DB.SaveChanges();
            return CreatedAtRoute("PostAddAttraction", new { id = attraction.id }, attraction);
        }

        [HttpGet]
        [Route("GetAllWaitingAttractions")]
        public IEnumerable<WaitingAttractions> GetAllWaitingAttractions()
        {
            return DB.WaitingAttractions;
        }

        [HttpDelete]
        [Route("DeleteWaitingAttraction/{id}", Name = "DeleteWaitingAttraction")]
        [ResponseType(typeof(WaitingAttractions))]
        // [Route("DeleteWaitingAttraction/{id}", Name = "DeleteWaitingAttraction")]
        public IHttpActionResult DeleteWaitingAttraction(int id)
        {
            var attraction = DB.WaitingAttractions.Where(x => x.id == id).FirstOrDefault();
            if (attraction == null)
                return null;

            List<WaitingAttractionsImages> listImg = new List<WaitingAttractionsImages>();

            listImg = DB.WaitingAttractionsImages.Where(x => x.waitingAttractionId == id).ToList();
            DB.WaitingAttractionsImages.RemoveRange(listImg);

            DB.WaitingAttractions.Remove(attraction);
            DB.SaveChanges();
            return Ok(attraction);
        }

        [HttpGet]
        [Route("IsExistAttraction/{attractionName}")]
        public bool IsExistAttraction(string attractionName)
        {
            var q = DB.WaitingAttractions.FirstOrDefault(x => x.attractionName == attractionName);
            if (q == null)
                return false;
            return true;
        }


        #region image
        [HttpGet]
        [Route("GetImagesByWaitingAttractionId/{id}", Name = "GetImagesByWaitingAttractionId")]
        public List<string> GetImagesByWaitingAttractionId(int id)
        {
            List<string> imagesSrc = new List<string>();
            var q = DB.WaitingAttractionsImages.Where(x => x.waitingAttractionId == id).Select(x => x.imgUrl);
            if (q != null)
                foreach (var item in q)
                    imagesSrc.Add(item);
            if (imagesSrc.Count == 0)
                return null;
            return imagesSrc;
        }

        [HttpPost]
        [Route("addWaitingAttractionImg/{id}", Name = "addWaitingAttractionImg")]
        public IHttpActionResult addWaitingAttractionImg(int id, string[] src)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            WaitingAttractionsImages im = new WaitingAttractionsImages();
            foreach (var item in src)
            {
                WaitingAttractionsImages image = new WaitingAttractionsImages();
                image.waitingAttractionId = id;
                image.imgUrl = item;
                DB.WaitingAttractionsImages.Add(image);
            }
            DB.SaveChanges();
            return Ok(im);
        }
        #endregion

        [HttpGet]
        [Route("GetWaitingAttractionIdByName/{name}", Name = "GetWaitingAttractionIdByName")]
        public int GetWaitingAttractionIdByName(string name)
        {
            int y=0;
            y = (DB.WaitingAttractions.Where(x => x.attractionName == name).Select(x => x.id).FirstOrDefault());
            return y;
        }
    }
}

