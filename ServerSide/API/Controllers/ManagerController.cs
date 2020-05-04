using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    [RoutePrefix("api/manager")]
    public class ManagerController : ApiController
    {
        public const string managerName = "hani&avigail";
        public const string email = "PlanYourTripSite@gmail.com";
        public const string password = "h1096a8283";

        [HttpGet]
        [Route("IsManager/{Email}/{Password}")]
        public bool IsManager(string Email, string Password)
        {
            if (Email == email && Password == password)
                return true;
            return false;
        }
        [HttpGet]
        [Route("IsPasswordError/{eMail}/{Password}")]
        public bool IsPasswordError(string eMail, string Password)
        {
            if (eMail == email && Password != password)
                return true;//לא קיים
            return false;

        }


    }
}