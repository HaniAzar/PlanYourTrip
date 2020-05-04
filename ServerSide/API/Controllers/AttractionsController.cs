using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DAL;
using BLL;
using System.Web.Http.Description;
using System.Data.Entity.Infrastructure;
using System.Threading.Tasks;
using System.Reflection;
using System.Net.Mail;

namespace API.Controllers
{
    [RoutePrefix("api/attractions")]
    public class AttractionsController : ApiController
    {
        Trips_DB DB = new Trips_DB();
        List<TouristAttractions> attractions;

        [HttpGet]
        [Route("GetAllAttractions")]
        public List<TouristAttractions> GetAllAttractions()
        {
            return DB.TouristAttractions.ToList();
        }

        [HttpGet]
        [Route("GetAttractionById/{id}")]
        public IHttpActionResult GetAttractionById(int id)
        {
            TouristAttractions attraction = DB.TouristAttractions.Find(id);
            if (attraction == null)
                return NotFound();
            return Ok(attraction);
        }
        [HttpGet]
        [Route("GetAttractionByName/{name}")]
        public IHttpActionResult GetAttractionByName(string name)
        {
            TouristAttractions attraction = DB.TouristAttractions.Where(x => x.attractionName.Contains(name)).FirstOrDefault();
            return Ok(attraction);
        }

        [HttpGet]
        [Route("GetAttractionsBySearchName/{name}")]
        public IHttpActionResult GetAttractionsBySearchName(string name)
        {
            List<TouristAttractions> attraction = DB.TouristAttractions.Where(x => x.attractionName.Contains(name)).ToList();
            if (attraction == null)
                return NotFound();
            return Ok(attraction);
        }

        #region image
        [HttpGet]
        [Route("GetUrlByAttractionId/{id}", Name = "GetUrlByAttractionId")]
        public List<string> GetUrlByAttractionId(int id)
        {
            List<string> imagesSrc = new List<string>();
            var q = from img in DB.ImagesUrl
                    join a in DB.TouristAttractions
                    on img.attractionId equals a.id
                    where a.id == id
                    select new { img.imgUrl };
            foreach (var item in q)
                imagesSrc.Add(item.imgUrl);
            if (imagesSrc == null)
                return null;
            return imagesSrc;
        }

        [HttpPost]
        [Route("AddImgUrl", Name = "AddImgUrl")]
        public IHttpActionResult AddImgUrl(ImagesUrl imageSrc)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("invalid");
            }
            //ImagesUrl image = new ImagesUrl();
            //image.attractionId = id;
            //image.imgUrl = img;
            DB.ImagesUrl.Add(imageSrc);
            DB.SaveChanges();
            return Ok(imageSrc);
        }
        #endregion

        [HttpGet]
        [Route("GetCategoriesByAttractionId/{id}")]
        public List<string> GetCategoriesByAttractionId(int id)
        {
            List<string> categories = new List<string>();
            var q = from ac in DB.AttractionsToCategories
                    join c in DB.Categories
                    on ac.categoryId equals c.id
                    where ac.attractionId == id
                    select new { c.categoryName };
            foreach (var item in q)
                categories.Add(item.categoryName);
            if (categories == null)
                return null;
            return categories;
        }

        [HttpPost]
        [Route("addAttraction", Name = "addAttraction")]
        [ResponseType(typeof(TouristAttractions))]
        public IHttpActionResult addAttraction(TouristAttractions attraction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            DB.TouristAttractions.Add(attraction);
            DB.SaveChanges();
            return CreatedAtRoute("addAttraction", new { id = attraction.id }, attraction);
        }

        [HttpPost]
        [Route("addAttractionsToCategories", Name = "addAttractionsToCategories")]
        public IHttpActionResult addAttractionsToCategories(AttractionsToCategories[] attractionsToCategories)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            DB.AttractionsToCategories.AddRange(attractionsToCategories);
            DB.SaveChanges();
            return CreatedAtRoute("addAttractionToCategories", new { attractionsToCategories }, attractionsToCategories);
        }
        [HttpGet]
        [Route("IsExistAttraction/{attractionName}")]
        public bool IsExistAttraction(string attractionName)
        {
            var q = DB.TouristAttractions.FirstOrDefault(x => x.attractionName == attractionName);
            if (q == null)
                return false;
            return true;
        }

        [HttpPost]
        [Route("UpdateAttraction", Name = "UpdateAttraction")]
        public IHttpActionResult UpdateAttraction(TouristAttractions attraction)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            DB.Entry(attraction).State = System.Data.Entity.EntityState.Modified;
            try
            {
                DB.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return StatusCode(HttpStatusCode.NoContent);
        }



        [HttpDelete]
        [Route("DeleteAttractionById")]
        public IHttpActionResult DeleteAttractionById(int id)
        {
            TouristAttractions attraction = DB.TouristAttractions.Find(id);
            if (attraction == null)
                return NotFound();
            DB.TouristAttractions.Remove(attraction);
            DB.SaveChanges();
            return Ok(attraction);
        }

        [HttpPost]
        [Route("GetCategoriesIdByCategoriesName", Name = "GetCategoriesIdByCategoriesName")]
        public List<int> GetCategoriesIdByCategoriesName(string[] categoriesName)
        {
            List<int> categoriesId = new List<int>();
            foreach (string categoryName in categoriesName)
            {
                int id = DB.Categories.Where(x => x.categoryName == categoryName).Select(x => x.id).FirstOrDefault();
                categoriesId.Add(id);
            }
            return categoriesId;
        }

        [HttpGet]
        [Route("GetAttractionIdByName/{name}", Name = "GetAttractionIdByName")]
        public int GetAttractionIdByName(string name)
        {
            int id = DB.TouristAttractions.Where(x => x.attractionName.Equals(name)).Select(y => y.id).FirstOrDefault();
            return id;
        }
        #region חיפוש אטרקציות
        //[HttpGet]
        [HttpPost]
        [Route("searchAttractions")]
        [ResponseType(typeof(TouristAttractions[]))]
        public List<TouristAttractions> searchAttractions(Search search)
        {
            List<TouristAttractions> results = GetAllAttractions();
            if (search == null)
                return results;
            if (search.categories.Any())
                results = searchByCategories(search.categories);
            if (search.seasons.Any() && search.seasons.Count < 5)
                results = searchBySeasons(results, search.seasons);
            if (search.areas.Any())
                results = searchByAreas(results, search.areas);
            if (search.properties.Any())
                results = searchByProperties(results, search.properties);
            return results;
        }
        public List<TouristAttractions> searchByCategories(List<string> categories)
        {
            attractions = new List<TouristAttractions>();
            foreach (var category in categories)
            {
                foreach (var attr in DB.TouristAttractions)
                {
                    List<string> categoriesAttraction = GetCategoriesByAttractionId(attr.id);

                    string result = categoriesAttraction.FirstOrDefault(x => x == category);
                    if (result != null && !attractions.Contains(attr))
                        attractions.Add(attr);
                }
            }
            return attractions;
        }
        public List<TouristAttractions> searchBySeasons(List<TouristAttractions> list, List<string> seasons)
        {
            attractions = new List<TouristAttractions>();
            foreach (var attraction in list)
                foreach (var season in seasons)
                    if (attraction.seasson == null || attraction.seasson.Contains(season) || attraction.seasson == "כל השנה")
                    {
                        if (!attractions.Contains(attraction))
                            attractions.Add(attraction);
                        break;
                    }
            return attractions;
        }
        public List<TouristAttractions> searchByAreas(List<TouristAttractions> list, List<string> areas)
        {
            attractions = new List<TouristAttractions>();
            foreach (var attraction in list)
            {
                foreach (var area in areas)
                    if (area.Contains(attraction.area) && !attractions.Contains(attraction))
                        attractions.Add(attraction);
            }
            return attractions;
        }
        public List<TouristAttractions> searchByProperties(List<TouristAttractions> list, List<string> properties)
        {
            attractions = new List<TouristAttractions>();
            if (properties.Contains("נגיש לאנשים מוגבלים"))
                attractions = list.Where(x => x.accessibility != "לא נגיש" && x.accessibility != null).ToList();
            if (properties.Contains("כניסה חינם"))
            {
                if (attractions.Any())
                    attractions = attractions.Where(t => t.payment == false).ToList();
                else
                    attractions = list.Where(t => t.payment == false).ToList();
            }
            if (properties.Contains("מתאים לקבוצות"))
            {
                if (attractions.Any())
                    attractions = attractions.Where(t => t.isMatchGroups == true).ToList();
                else
                    attractions = list.Where(t => t.isMatchGroups == true).ToList();
            }
            if (properties.Contains("כניסה למים"))
            {
                if (attractions.Any())
                    attractions = attractions.Where(t => t.entranceToWater == true).ToList();
                else
                    attractions = list.Where(t => t.entranceToWater == true).ToList();
            }
            if (properties.Contains("במיוחד לילדים"))
            {
                if (attractions.Any())
                    attractions = attractions.Where(t => t.isMatchChildren == true).ToList();
                else
                    attractions = list.Where(t => t.isMatchChildren == true).ToList();
            }
            return attractions;
        }
        #endregion

        [HttpPost]
        [Route("sendEmail/{num}", Name = "sendEmail")]
        public IHttpActionResult sendEmail(int num, TouristAttractions[] trips)
        {
            string email = trips[0].address;
            try
            {
                MailAddress emailAddress = new MailAddress(email);
                List<string> tripList = new List<string>();

                foreach (var item in trips)
                {
                    tripList.Add(item.attractionName);

                }
                if (num == 1)//שליחה למשתמש את המסלול
                    SendEmail.sendTrip(emailAddress, "הטיול שתכננת", " ", tripList);
                if (num == 2)//שליחה למדריך בקשת הצטרפות לטיול של משתמש
                    SendEmail.sendTrip(emailAddress, "בקשת הדרכה למסלול", " ", tripList);
                if (num == 3)
                    SendEmail.sendTrip(emailAddress, "בקשת הצטרפות לטיול מאורגן", " ", tripList);
                if (num == 4)
                    SendEmail.sendTrip(emailAddress, "בקשת הצטרפות לטיול מאורגן שותפת ע'י חבר   ", " ", tripList);
            }
            catch (Exception ex)
            {

            }
            return CreatedAtRoute("sendEmail", new { em = email }, trips);
        }
        [HttpGet]
        [Route("getAttractionIfExist/{attractionName}")]
        public TouristAttractions getAttractionIfExist(string attractionName)
        {
            TouristAttractions attraction = DB.TouristAttractions.Where(x => x.attractionName.Contains(attractionName)).FirstOrDefault();
            if (attraction != null)
                return attraction;
            else return null;
        }

    }

}
