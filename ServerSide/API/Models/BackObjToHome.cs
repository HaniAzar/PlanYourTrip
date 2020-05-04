using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace API.Models
{
    public class BackObjToHome
    {
        public int id { get; set; }
        public string guideName { get; set; }
        public string eMail { get; set; }
        public string phoneNumber { get; set; }
        public string languages { get; set; }
        public string workingDays { get; set; }
    }
}