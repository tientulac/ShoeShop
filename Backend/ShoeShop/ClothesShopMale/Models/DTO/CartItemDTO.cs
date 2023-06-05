using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClothesShopMale.Models.DTO
{
    public class CartItemDTO
    {
        public int product_id { get; set; }
        public int count { get; set; }
        public string size { get; set; }
        public string color { get; set; }
    }

    public class ListCartItemDTO
    {
        public List<CartItemDTO> list_cart_item { get; set; }
    }
}