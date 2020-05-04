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
using System.Net.Mail;
using System.Text;

namespace API.Controllers
{
    [RoutePrefix("api/Users")]
    public class UsersController : ApiController
    {
        Trips_DB DB = new Trips_DB();

        [HttpGet]
        [Route("getUserById/{id}")]
        public IHttpActionResult getUserById(int id)
        {
            Users user = DB.Users.Where(x => x.id == id).FirstOrDefault();
            if (user == null)
                return null;
            user.password = "";
            return Ok(user);
        }

        [HttpGet]
        [Route("IsExistUser/{eMail}/{password}")]
        public object IsExistUser(string email, string password)
        {
            Users user = DB.Users.FirstOrDefault(u => u.eMail == email && u.password == password);

            if (user != null)
            {
                user.password = "";
                return user;
            }
            return null;
        }
        [HttpGet]
        [Route("getIfMatchPasswordGuide/{email}/{password}")]//שלמשתמש לא כמו המדריך
        public Boolean getIfMatchPassword(string email, string password)
        {
            TourGuides guide = DB.TourGuides.FirstOrDefault(x => x.eMail == email);
            if (guide.password == password)
                return true;//לא טוב 
            return false;
        }
        [HttpGet]
        [Route("getIfMatchPasswordUser/{email}/{password}")]//שלמדרים לא כמו המשתמש
        public Boolean getIfMatchPasswordUser(string email, string password)
        {
            Users user = DB.Users.FirstOrDefault(x => x.eMail == email);
            if (user.password == password)
                return true;//לא טוב 
            return false;
        }
        [HttpGet]
        [Route("getUserIfMatchPasswordUser/{email}/{password}")]//שלמדרים לא כמו המשתמש
        public Users getUserIfMatchPasswordUser(string email, string password)
        {
            Users user = DB.Users.FirstOrDefault(x => x.eMail == email);
            if (user.password == password)
            {
                user.password = "";
                return user;//קיים 
            }

            return null;
        }

        [HttpGet]
        [Route("getIfExistUser/{email}/{password}")]
        public Boolean getIfExistUser(string email, string password)
        {
            Users user = DB.Users.FirstOrDefault(x => x.eMail == email);
            if (user != null)
                return true;//לא טוב קיים כזה משתמש 
            return false;
        }
        [HttpGet]
        [Route("getIfExistGuide/{email}/{password}")]
        public Boolean getIfExistGuide(string email, string password)
        {
            TourGuides guide = DB.TourGuides.FirstOrDefault(x => x.eMail == email);
            if (guide != null)
                return true;//לא טוב קיים כזה מדריך 
            return false;
        }



        [HttpGet]
        [Route("IsPasswordError/{eMail}/{password}")]
        public bool IsPasswordError(string email, string password)
        {
            if (DB.Users.FirstOrDefault(u => u.eMail == email && u.password != password) == null)
                return false;//לא קיים
            return true;

        }

        [HttpPost]
        [Route("addUser", Name = "addUser")]
        public IHttpActionResult addUser(Users user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            DB.Users.Add(user);
            DB.SaveChanges();
            user.password = "";
            return CreatedAtRoute("addUser", new { id = user.id }, user);
        }



        [HttpPut]
        [Route("UpdateUserDetails")]
        public IHttpActionResult UpdateUserDetails(int id, Users user)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            if (id != user.id)
                return BadRequest();
            DB.Entry(user).State = System.Data.Entity.EntityState.Modified;
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
        [Route("DeleteUserById")]
        public IHttpActionResult DeleteUserById(int id)
        {
            Users user = DB.Users.Find(id);
            if (user == null)
                return NotFound();
            DB.Users.Remove(user);
            DB.SaveChanges();
            user.password = "";
            return Ok(user);
        }
        [HttpPost]
        [Route("addUserTrip", Name = "addUserTrip")]
        public IHttpActionResult addUserTrip(UsersTrips user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            DB.UsersTrips.Add(user);
            DB.SaveChanges();
            return CreatedAtRoute("addUserTrip", new { id = user.id }, user);
        }

        [HttpPost]
        [Route("addAttractionToUserTrip", Name = "addAttractionToUserTrip")]
        public IHttpActionResult addAttractionToUserTrip(AttractionsToUsersTrips attractionToUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            DB.AttractionsToUsersTrips.Add(attractionToUser);
            DB.SaveChanges();
            return CreatedAtRoute("addAttractionToUserTrip", new { id = attractionToUser.id }, attractionToUser);
        }

        [HttpDelete]
        [Route("deleteUserTripById/{id}")]
        public IHttpActionResult deleteUserTripById(int id)
        {
            UsersTrips userT = DB.UsersTrips.FirstOrDefault(x => x.id == id);
            List<AttractionsToUsersTrips> atu = DB.AttractionsToUsersTrips.Where(x => x.tripId == id).ToList();

            foreach (var item in atu)
            {
                DB.AttractionsToUsersTrips.Remove(item);
            }
            DB.UsersTrips.Remove(userT);
            DB.SaveChanges();
            return Ok(userT);
        }

        private static Random random = new Random();
        [HttpGet]
        [Route("getIfExistPassword/{emailUser}/{user}")]
        public bool getIfExistPassword(string emailUser, string user)
        {
            bool IsExist = true;
            string newPassword;
            newPassword = RandomString(8);
            while (IsExist)
            {
                if (DB.Users.Where(x => x.password == newPassword).Select(x => x.password).FirstOrDefault() == null)
                {
                    sendNewPassword(newPassword, emailUser);
                    Users upDateUser = DB.Users.FirstOrDefault(x => x.eMail == emailUser);
                    if (upDateUser == null)
                        return false;
                    upDateUser.password = newPassword;
                    DB.Entry(upDateUser).State = System.Data.Entity.EntityState.Modified;
                    DB.SaveChanges();
                    return false;
                }
                else
                    newPassword = RandomString(8);
            }
            return IsExist;
        }

        public static string RandomString(int length)
        {
            const string chars = "abcdefghijklmnpqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());

        }

        public string sendNewPassword(string password, string emailUser)
        {
            MailAddress emailAddress = new MailAddress(emailUser);
            SendEmail.send(emailAddress, "אימות חשבון ", "סיסמתך החדשה:  " + password);
            return "נשלח בהצלחה";
        }

    }
}