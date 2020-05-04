using BLL;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Http.Description;

namespace API.Controllers
{
    [RoutePrefix("api/tripForJoining")]

    public class tripsForJoiningController : ApiController
    {
        Trips_DB DB = new Trips_DB();
        [HttpGet]
        [Route("getAttractionsByTripId/{id}")]
        public List<string> getAttractionsByTripId(int id)
        {
            List<int> idList = DB.AttractionsToGuidesTrips.Where(x => x.tripId == id).Select(x => x.attractionId).ToList();
            List<string> attractionsName = new List<string>();
            if (idList.Any())
                foreach (int i in idList)
                    attractionsName.Add(DB.TouristAttractions.Where(x => x.id == i).Select(x => x.attractionName).FirstOrDefault());
            return attractionsName;
        }

        [HttpGet]
        [Route("getAttractionsIdByTripId/{id}")]
        public List<int> getAttractionsIdByTripId(int id)
        {
            List<int> attractionToGuide = DB.AttractionsToGuidesTrips.Where(x => x.tripId == id).Select(x => x.attractionId).ToList(); ;
            if (attractionToGuide == null)
                return null;
            return attractionToGuide;
        }
        [HttpGet]
        [Route("GetAllTripsForJoining")]
        public List<TripsForJoining> GetAllTripsForJoining()
        {
            return DB.TripsForJoining.ToList();
        }

        [HttpGet]
        [Route("getAllTripForJoiningById/{id}")]
        public List<TripsForJoining> getAllTripForJoiningById(int id)
        {
            List<TripsForJoining> tripsGuide = new List<TripsForJoining>();
            tripsGuide = DB.TripsForJoining.Where(x => x.guideId == id).ToList();
            return tripsGuide;
        }

        [HttpGet]
        [Route("getAllUsersByTripId/{tripId}")]
        public List<Users> getAllUsersByTripId(int tripId)
        {
            List<writtenDownUsers> WDUsers = new List<writtenDownUsers>();
            List<Users> users = new List<Users>();
            WDUsers = DB.writtenDownUsers.Where(x => x.tripForJoiningId == tripId).ToList();
            foreach (var item in WDUsers)
            {
                Users u = DB.Users.FirstOrDefault(x => x.id == item.userId);
                users.Add(u);
            }
            List<Users> usersNotDistinct = users.Distinct().ToList();

            return usersNotDistinct;
        }

        [HttpPost]
        [Route("addTripForJoining", Name = "addTripForJoining")]
        public IHttpActionResult addTripForJoining(TripsForJoining guideTrip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            DB.TripsForJoining.Add(guideTrip);
            DB.SaveChanges();
            return CreatedAtRoute("addTripForJoining", new { id = guideTrip.id }, guideTrip);
        }

        [HttpPost]
        [Route("signUserToTrip", Name = "signUserToTrip")]
        public IHttpActionResult signUserToTrip(writtenDownUsers wd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            DB.writtenDownUsers.Add(wd);
            DB.SaveChanges();
            return CreatedAtRoute("signUserToTrip", new { id = wd.id }, wd);
        }

        [HttpPut]
        [Route("UpdateNumOfSavedTourists", Name = "UpdateNumOfSavedTourists")]
        public IHttpActionResult UpdateNumOfSavedTourists(writtenDownUsers wd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            TripsForJoining trip = DB.TripsForJoining.Where(x => x.id == wd.tripForJoiningId).First();
            if (trip != null)
                trip.numOfSavedTourists += wd.numOfTourists.Value;
            DB.Entry(trip).State = System.Data.Entity.EntityState.Modified;
            DB.SaveChanges();
            return Ok();
        }
        [HttpPut]
        [Route("updateTripForJoining", Name = "updateTripForJoining")]
        public TripsForJoining updateTripForJoining(TripsForJoining tripToUpdate)
        {
            if (tripToUpdate == null)
                return null;
            DB.Entry(tripToUpdate).State = System.Data.Entity.EntityState.Modified;
            DB.SaveChanges();
            return tripToUpdate;
        }

        [HttpPost]
        [Route("deleteTripForJoiningById", Name = "deleteTripForJoiningById")]
        //[ResponseType(typeof(TripsForJoining))]
        public IHttpActionResult deleteTripForJoiningById(List<TripsForJoining> tripsJoining)
        {
            foreach (var item in tripsJoining)
            {
                TripsForJoining trips = DB.TripsForJoining.Where(x => x.id == item.id).FirstOrDefault();
                if (trips == null)
                {
                    return BadRequest(ModelState);
                }
                List<AttractionsToGuidesTrips> attractionToGuideTrip = DB.AttractionsToGuidesTrips.Where(x => x.tripId == trips.id).ToList();
                foreach (var item2 in attractionToGuideTrip)
                {
                    AttractionsToGuidesTrips guideTrip = DB.AttractionsToGuidesTrips.Where(x => x.id == item2.id).FirstOrDefault();
                    DB.AttractionsToGuidesTrips.Remove(guideTrip);
                }
                DB.TripsForJoining.Remove(trips);
            }
            DB.SaveChanges();
            return Ok();
        }
        [HttpPost]
        [Route("deleteTripForJoiningByTripId")]
        public TripsForJoining deleteTripForJoiningByTripId(TripsForJoining trip)
        {
            List<writtenDownUsers> wdUser = DB.writtenDownUsers.Where(x => x.tripForJoiningId == trip.id).ToList();
            if (wdUser != null)
                DB.writtenDownUsers.RemoveRange(wdUser);
            List<AttractionsToGuidesTrips> attractionGuide = DB.AttractionsToGuidesTrips.Where(x => x.tripId == trip.id).ToList();
            if (attractionGuide != null)
                DB.AttractionsToGuidesTrips.RemoveRange(attractionGuide);
            List<TripsForJoining> tripsJoining = DB.TripsForJoining.Where(x => x.id == trip.id).ToList();
            if (tripsJoining != null)
                DB.TripsForJoining.RemoveRange(tripsJoining);
            DB.SaveChanges();

            return trip;
        }
        [HttpGet]
        [Route("deleteTripForJoiningGuideById/{id}")]
        public int deleteTripForJoiningGuideById(int id)
        {
            List<writtenDownUsers> wdUser = DB.writtenDownUsers.Where(x => x.tripForJoiningId == id).ToList();
            if (wdUser != null)
                DB.writtenDownUsers.RemoveRange(wdUser);
            List<AttractionsToGuidesTrips> attractionGuide = DB.AttractionsToGuidesTrips.Where(x => x.tripId == id).ToList();
            if (attractionGuide != null)
                DB.AttractionsToGuidesTrips.RemoveRange(attractionGuide);
            List<TripsForJoining> tripsJoining = DB.TripsForJoining.Where(x => x.id == id).ToList();
            if (tripsJoining != null)
                DB.TripsForJoining.RemoveRange(tripsJoining);
            DB.SaveChanges();

            return id;
        }

        [HttpPost]
        [Route("SignUpTripSendEmail", Name = "SignUpTripSendEmail")]
        public string SignUpTripSendEmail(Users user)
        {
            MailAddress emailAddress = new MailAddress(user.eMail);
            try
            {
                SendEmail.send(emailAddress, "   נרשמת בהצלחה לטיול מאורגן   ", " היות ויתכן שינויים אנא הישארו מעודכנים <br/> עקבו אחרינו באתר ובמייל");
            }
            catch (Exception ex)
            {
            }
            return "נשלח בהצלחה";
        }
        [HttpPost]
        [Route("sendEmailToUpdate", Name = "sendEmailToUpdate")]
        public string sendEmailToUpdate(Users user)
        {
            MailAddress emailAddress = new MailAddress(user.eMail);
            try
            {
                SendEmail.send(emailAddress, " עדכון טיול מאורגן שנרשמת   ",
                    "השתנו פרטי הטיול שנרשמת התעדכן באתר     http://localhost:4200/planYourTrip/tripsForJoining   לטיול שנרשמתי </ a > ");
            }
            catch (Exception ex) { }
            return "נשלח בהצלחה";
        }
        [HttpPost]
        [Route("sendEmailToUsersCanceledTrip")]
        public string sendEmailToUsersCanceledTrip(Users user)
        {
            MailAddress emailAddress = new MailAddress(user.eMail);
            try
            {
                SendEmail.send(emailAddress, " ביטול טיול   ", "טיול מאורגן שנרשמת התבטל מסיבות הכרחיות - עמכם הסליחה!");
            }
            catch (Exception ex) { }
            return "נשלח בהצלחה";
        }



    }
}

