using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace BLL
{
    public class Search
    {
        public List<string> areas { get; set; }
        public List<string> categories { get; set; }
        public List<string> seasons { get; set; }
        public List<string> properties { get; set; }

        public Search()
        {

        }
        public Search(List<string> areas, List<string> categories, List<string> seasons, List<string> properties)
        {
            this.areas = areas;
            this.categories = categories;
            this.seasons = seasons;
            this.properties = properties;
        }
    }
}
