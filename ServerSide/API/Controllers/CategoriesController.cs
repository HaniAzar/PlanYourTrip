using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace API.Controllers
{
    [RoutePrefix("api/categories")]
    public class CategoriesController : ApiController
    {
        Trips_DB DB = new Trips_DB();

        [HttpGet]
        [Route("GetCategories",Name = "GetCategories")]
        public IEnumerable<Categories> GetCategories()
        {
            return DB.Categories;
        }

        [HttpGet]
        [Route("GetCategoryById/{id}")]
        public IHttpActionResult GetCategoryById(int id)
        {
            Categories category = DB.Categories.Find(id);
            if (category == null)
                return NotFound();
            return Ok(category);
        }

      

        [HttpPost]
        [Route("addCategory")]
        public IHttpActionResult addCategory(Categories category)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            DB.Categories.Add(category);

            DB.SaveChanges();
            return CreatedAtRoute("DefaultApi", new { id = category.id }, category);
        }
    }
}