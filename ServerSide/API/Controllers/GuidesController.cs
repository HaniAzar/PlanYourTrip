using BLL;
using DAL;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Http.Description;

namespace API.Controllers
{
    [RoutePrefix("api/Guides")]
    public class GuidesController : ApiController
    {
        Trips_DB DB = new Trips_DB();

        [HttpGet]
        [Route("GetAllGuides")]
        public List<TourGuides> GetAllGuides()
        {
            List<TourGuides> guides = new List<TourGuides>();
            guides = DB.TourGuides.ToList();
            foreach (var item in guides)
            {
                item.password = "";
            }
            return guides;
        }

        [HttpGet]
        [Route("getGuideById/{id}")]
        public IHttpActionResult getGuideById(int id)
        {
            TourGuides guide = DB.TourGuides.Find(id);
            if (guide == null)
                return NotFound();
            //guide.password = "";
            return Ok(guide);
        }

        [HttpGet]
        [Route("getRequestFromGuide/{id}")]
        public List<UsersTrips> getRequestFromGuide(int id)
        {
            List<UsersTrips> usersTripList = DB.UsersTrips.Where(x => x.guideId == id && x.isSentRequest == true).ToList();
            return usersTripList;
        }

        [HttpGet]
        [Route("getAttractionToUserTripByTripId/{id}")]
        public List<AttractionsToUsersTrips> getAttractionToUserTripByTripId(int id)
        {
            List<AttractionsToUsersTrips> UserTrip = DB.AttractionsToUsersTrips.Where(x => x.tripId == id).ToList();
            return UserTrip;
        }


        [HttpGet]
        [Route("IsExistGuide/{eMail}/{password}")]
        public object IsExistGuide(string email, string password)
        {
            TourGuides guide = DB.TourGuides.FirstOrDefault(g => g.eMail == email && g.password == password);
            if (guide != null)
            {
                //guide.password = "";
                return guide;
            }
            return null;
        }

        [HttpGet]
        [Route("IsPasswordError/{eMail}/{password}")]
        public bool IsPasswordError(string email, string password)
        {
            if (DB.TourGuides.FirstOrDefault(u => u.eMail == email && u.password != password) == null)
                return false;//לא קיים
            return true;
        }

        [HttpGet]
        [Route("searchGuidByName/{guideName}")]
        public object searchGuidByName(string guideName)
        {
            TourGuides guide = DB.TourGuides.FirstOrDefault(g => g.guideName == guideName);
            if (guide != null)
            {
                guide.password = "";
                return guide;
            }
            return null;
        }

        [HttpPost]
        [Route("getAllFreeGuideByDate")]
        public List<TourGuides> getAllFreeGuideByDate(wrapDate wrapdateTrip)
        {
            if (wrapdateTrip.dateTrip < DateTime.Now.Date)
                return null;

            wrapdateTrip.dateTrip = wrapdateTrip.dateTrip.AddDays(1);
            List<TourGuides> guide = DB.TourGuides.ToList();
            List<TourGuides> freeGuide = DB.TourGuides.ToList();
            List<TourGuides> BusyGuide = new List<TourGuides>();
            List<GuideActivityDiary> guideActivityDairy = DB.GuideActivityDiary.ToList();
            List<GuideActivityDiary> busyGuideActivityDairy = new List<GuideActivityDiary>();
            busyGuideActivityDairy = DB.GuideActivityDiary.Where(x => x.activityDate.Day == wrapdateTrip.dateTrip.Day &&
               x.activityDate.Month == wrapdateTrip.dateTrip.Month &&
                      x.activityDate.Year == wrapdateTrip.dateTrip.Year).ToList();
            foreach (var item in busyGuideActivityDairy)
                BusyGuide.Add(DB.TourGuides.Where(x => x.id == item.guideId).FirstOrDefault());
            foreach (var item in guide)
            {
                foreach (var item2 in BusyGuide)
                    if (item == item2)
                        freeGuide.Remove(item2);
            }
            return freeGuide;
        }

        [HttpPost]
        [Route("PostAddGuide")]
        public TourGuides PostAddGuide(TourGuides guide)
        {
            if (guide == null)
            {
                return null;
            }
            DB.TourGuides.Add(guide);
            DB.SaveChanges();
            guide.password = "";
            return guide;
        }

        [HttpPost]
        [Route("addGuideToActivityDiary")]
        public GuideActivityDiary addGuideToActivityDiary(GuideActivityDiary guideActivityDiary)
        {
            if (!ModelState.IsValid)
                return null;
            DB.GuideActivityDiary.Add(guideActivityDiary);
            DB.SaveChanges();
            return guideActivityDiary;
        }

        [HttpPost]
        [Route("addAttractionToGuideTrip/{id}", Name = "addAttractionToGuideTrip")]
        public IHttpActionResult addAttractionToGuideTrip(int id, TouristAttractions attraction)
        {
            AttractionsToGuidesTrips attr = new AttractionsToGuidesTrips();
            attr.tripId = id;
            attr.attractionId = attraction.id;
            DB.AttractionsToGuidesTrips.Add(attr);
            DB.SaveChanges();
            return Ok(attraction);
        }

        [HttpDelete]
        [Route("deleteGuideById/{id}")]
        public IHttpActionResult deleteGuideById(int id)
        {
            TourGuides guide = DB.TourGuides.FirstOrDefault(x => x.id == id);
            DB.TourGuides.Remove(guide);
            DB.SaveChanges();
            guide.password = "";
            return Ok(guide);
        }

        [HttpDelete]
        [Route("deleteAttractionFromAttractionToGuideById/{id}")]
        public IHttpActionResult deleteAttractionFromAttractionToGuideById(int id)
        {
            AttractionsToGuidesTrips attractions = DB.AttractionsToGuidesTrips.FirstOrDefault(x => x.attractionId == id);

            DB.AttractionsToGuidesTrips.Remove(attractions);
            DB.SaveChanges();
            return Ok(attractions);
        }

        //[HttpPost]
        //[Route("AddAttractionToAttractionToGuide/{id}")]
        //public IHttpActionResult AddAttractionToAttractionToGuide(int id)
        //{
        //    AttractionsToGuidesTrips attr = new AttractionsToGuidesTrips();
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }
        //    attr.tripId = id;
        //    attr.attractionId = attraction.id;
        //    DB.AttractionsToGuidesTrips.Add(attr);
        //    DB.SaveChanges();
        //    return CreatedAtRoute("addAttractionToGuideTrip", new { id = attr.id }, attr);
        //}

        [HttpGet]
        [Route("checkTripsForGuide/{id}")]
        public Boolean checkTripsForGuide(int id)
        {
            var q = DB.GuideActivityDiary.Where(x => x.guideId == id).FirstOrDefault();
            if (q == null)
                return false;
            return true;
        }


        [HttpGet]
        [Route("sendEmail/{email}/{IsOk}")]
        public string sendEmail(string email, bool IsOk)
        {
            MailAddress emailAddress = new MailAddress(email);
            if (IsOk == true)
                SendEmail.send(emailAddress, "ברוך הבא", "תודה שהצטרפת אלינו");
            else
                SendEmail.send(emailAddress, "Plan Your Trip בהמשך לבקשתך להצטרף כמדריך ל", "פרטיך נבדקו אך אינך מתאים לתנאי האתר");
            return "נשלח בהצלחה";
        }

        [HttpGet]
        [Route("sendEmailDisAgreeRequest/{email}/{id}/{cause}")]
        public string sendEmailDisAgreeRequest(string email, int id, string cause)
        {
            MailAddress emailAddress = new MailAddress(email);//להוסיף סיבה לביטול
            SendEmail.send(emailAddress, "המדריך לא אישר את בקשתך להצטרף לטיול שלך ", cause);
            return "נשלח בהצלחה";
        }
        [HttpPost]
        [Route("sendEmailAgreeRequest/{id}")]
        public string sendEmailAgreeRequest(int id, UsersTrips userTrip)
        {
            string emailUser = DB.Users.Where(x => x.id == id).Select(x => x.eMail).FirstOrDefault();
            MailAddress emailAddress = new MailAddress(emailUser);
            SendEmail.send(emailAddress, "בהמשך לבקשתך לצרף מדריך ", " המדריך אישר את הצטרפותו לטיול שלך בתאריך " + userTrip.tripDate + " ויצור איתך קשר לגבי ההמשך");
            return "נשלח בהצלחה";
        }

        public class wrapDate
        {
            public DateTime dateTrip { get; set; }
        }


        [HttpPost]
        [Route("upDateGuideDetailes", Name = "upDateGuideDetailes")]
        public IHttpActionResult upDateGuideDetailes(TourGuides guide)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            DB.Entry(guide).State = System.Data.Entity.EntityState.Modified;
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

        [HttpGet]
        [Route("getallAttractionToGuideByTripId/{id}")]
        public List<AttractionsToGuidesTrips> getallAttractionToGuideByTripId(int id)
        {
            List<AttractionsToGuidesTrips> attractionToGuide = DB.AttractionsToGuidesTrips.Where(x => x.tripId == id).ToList();
            if (attractionToGuide == null)
                return null;
            return attractionToGuide;
        }

        [HttpGet]
        [Route("getAllTripForActivityDairyById/{id}")]
        public List<GuideActivityDiary> getAllTripForActivityDairyById(int id)
        {
            List<GuideActivityDiary> guideActivityDiary = DB.GuideActivityDiary.Where(x => x.guideId == id).ToList();
            if (guideActivityDiary == null)
                return null;
            return guideActivityDiary;
        }



    }
}

