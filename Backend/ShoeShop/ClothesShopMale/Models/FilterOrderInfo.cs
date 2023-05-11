using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClothesShopMale.Models
{
    public class FilterOrderInfo
    {
        public DateTime? from_date { get; set; }
        public DateTime? to_date { get; set; }
        public string order_code { get; set; }
    }
}