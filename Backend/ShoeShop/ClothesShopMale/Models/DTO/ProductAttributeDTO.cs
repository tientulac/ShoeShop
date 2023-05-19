using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClothesShopMale.Models.DTO
{
    public class ProductAttributeDTO
    {
        public int product_attribute_id { get; set; }
        public string size { get; set; }
        public string color { get; set; }
        public decimal price { get; set; }
        public int product_id { get; set; }
        public int amount { get; set; }
    }
}