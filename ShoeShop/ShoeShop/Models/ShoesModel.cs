using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShoeShop.Models
{
    public class ShoesModel : Shoe
    {
        public string CategoryName { get; set; }
        public string BrandName { get; set; }
        public string GenderName { get; set; }
        public double FromPrice { get; set; }
        public double ToPrice { get; set; }
    }
}