using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
namespace BLL
{

    public class SendEmail
    {

        private static MailMessage mail = new MailMessage();

        public static void send(MailAddress address, string subject, string body)
        {
            mail.To.Clear();
            mail.To.Add(address);

            mail.From = new MailAddress("PlanYourTripSite@gmail.com");
            mail.Subject = subject;
            //mail.Body = body + "<br><a href='http://localhost:4200/planYourTrip/login'>לאתר</a>";
            mail.Body = "<body>" +
                  "<label style = 'font-size: 17px;margin-top:5px;font-family: sans-serif;color: black;'>" + subject + "</label><br >" +
                "<label style = 'font-size: 15px;margin-top:5px;font-family: sans-serif;color: #0fbd24;'>" + body + "</label><br >" +
                 "<label style = 'font-size: 12px;margin-top:5px;font-family: sans-serif;color: black;'>צוות PlanYourTrip מאחל הנאה מושלמת</label><br >" +
                "<a href='http://localhost:4200/planYourTrip/login'>לאתר לחץ כאן</a><br ><br >" +
                "<label style = 'font-size: 35px;margin-top:5px;font-family: sans-serif;color: #0fbd24;' >PlanYourTrip</label>" +
                "</body>";

            mail.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com";
            smtp.Credentials = new System.Net.NetworkCredential(
                "PlanYourTripSite@gmail.com", "ha10968283");
            smtp.EnableSsl = true;
            try
            {
                smtp.Send(mail);
            }
            catch (Exception ex)
            {
                ////             
            }
        }
        public static void sendTrip(MailAddress address, string subject, string body, List<string> trip)
        {
            mail.To.Clear();
            mail.To.Add(address);
            mail.From = new MailAddress("PlanYourTripSite@gmail.com");
            mail.Subject = subject;
            foreach (var item in trip)
            {
                body = body + item + " ";
            }
            //mail.Body = body + "<a href='http://localhost:4200/planYourTrip/login'>לאתר</a>";

            mail.Body = "<body>" +
                  "<label style = 'font-size: 15px;margin-top:5px;font-family: sans-serif;color: #0fbd24;'>" + subject + "</label><br ><br >" +
                  "<label style = 'font-size: 18px;margin-top:5px;font-family: sans-serif;color: black;'>המסלול:</label><br >" +
                  "<label style = 'font-size: 15px;margin-top:5px;font-family: sans-serif;color: black;'>" + body + "</label><br >" +
                  "<label style = 'font-size: 12px;margin-top:5px;font-family: sans-serif;color: #0fbd24;'>צוות PlanYourTrip מאחל הנאה מושלמת</label><br >" +
                  "<a href='http://localhost:4200/planYourTrip/login'>לאתר לחץ כאן</a><br >" +
                  "<label style = 'font-size: 35px;margin-top:5px;font-family: sans-serif;color: #0fbd24;' >PlanYourTrip</label>" +
                  "</body>";
            mail.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com";
            smtp.Credentials = new System.Net.NetworkCredential(
                "PlanYourTripSite@gmail.com", "ha10968283");
            smtp.EnableSsl = true;
            try
            {
                smtp.Send(mail);
            }
            catch (Exception ex)
            {
                ////             
            }
        }


    }
}
