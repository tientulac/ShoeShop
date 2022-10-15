using ShoeShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ShoeShop.Controllers
{
    public class ShoesController : Controller
    {
        private LinqDataContext db = new LinqDataContext();

        // GET: Product
        public ActionResult Index()
        {
            return Json(new { success = true, data = GetListShoes() }, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult FilterProduct(ShoesModel shoes)
        {
            try
            {
                var _data = GetListShoes();
                if (!String.IsNullOrEmpty(shoes.ShoesName))
                {
                    _data = _data.Where(x => CompareString(x.ShoesName, shoes.ShoesName)).ToList();
                }
                if (!String.IsNullOrEmpty(shoes.BrandName))
                {
                    _data = _data.Where(x => CompareString(x.BrandName, shoes.BrandName)).ToList();
                }
                if (!String.IsNullOrEmpty(shoes.Size))
                {
                    _data = _data.Where(x => CompareString(x.Size, shoes.Size)).ToList();
                }
                if (!String.IsNullOrEmpty(shoes.Color))
                {
                    _data = _data.Where(x => CompareString(x.Color, shoes.Color)).ToList();
                }
                if (!String.IsNullOrEmpty(shoes.Origin))
                {
                    _data = _data.Where(x => CompareString(x.Origin, shoes.Origin)).ToList();
                }
                if (shoes.FromPrice > 0)
                {
                    _data = _data.Where(x => x.FromPrice >= shoes.FromPrice).ToList();
                }
                if (shoes.ToPrice > 0)
                {
                    _data = _data.Where(x => x.ToPrice <= shoes.ToPrice).ToList();
                }
                if (shoes.Price > 0)
                {
                    _data = _data.Where(x => x.Price == shoes.Price).ToList();
                }
                if (shoes.CategoryId > 0)
                {
                    _data = _data.Where(x => x.CategoryId == shoes.CategoryId).ToList();
                }
                if (shoes.BrandId > 0)
                {
                    _data = _data.Where(x => x.BrandId == shoes.BrandId).ToList();
                }
                if (shoes.Gender != null)
                {
                    _data = _data.Where(x => x.Gender == shoes.Gender).ToList();
                }

                return Json(new { success = true, data = _data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, data = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public ActionResult SearchProduct(string searchString)
        {
            try
            {
                var _data = GetListShoes();

                if (!String.IsNullOrEmpty(searchString))
                {
                    _data = _data.Where(x =>
                                CompareString(x.ShoesName, searchString) ||
                                CompareString(x.BrandName, searchString) ||
                                CompareString(x.Size, searchString) ||
                                CompareString(x.Color, searchString) ||
                                CompareString(x.Origin, searchString)
                                ).ToList();
                }

                return Json(new { success = true, data = _data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, data = ex.Message }, JsonRequestBehavior.AllowGet);

            }
        }

        public List<ShoesModel> GetListShoes()
        {
            var _data = (from a in db.Shoes
                         select new ShoesModel
                         {  ShoesId = a.ShoesId,
                            ShoesName = a.ShoesName,
                            Size = a.Size,
                            Color = a.Color,
                            Origin = a.Origin,
                            Price = a.Price,
                            Gender = a.Gender,
                            Descrip = a.Descrip,
                            Rating = a.Rating,
                            Amount = a.Amount,
                            CategoryId = a.CategoryId,
                            BrandId = a.BrandId,
                            CategoryName = db.Categories.Where(c => c.CategoryId == a.CategoryId).FirstOrDefault().CategoryName ?? "Khác",
                            BrandName = db.Brands.Where(b => b.BrandId == b.BrandId).FirstOrDefault().BrandName ?? "Khác",
                            GenderName = (a.Gender == true) ? "Nam" : "Nữ"
                         }).ToList();
            return _data;
        }

        public string RemoveSign(string text)
        {
            string[] arr1 = new string[] { "á", "à", "ả", "ã", "ạ", "â", "ấ", "ầ", "ẩ", "ẫ", "ậ", "ă", "ắ", "ằ", "ẳ", "ẵ", "ặ",
            "đ",
            "é","è","ẻ","ẽ","ẹ","ê","ế","ề","ể","ễ","ệ",
            "í","ì","ỉ","ĩ","ị",
            "ó","ò","ỏ","õ","ọ","ô","ố","ồ","ổ","ỗ","ộ","ơ","ớ","ờ","ở","ỡ","ợ",
            "ú","ù","ủ","ũ","ụ","ư","ứ","ừ","ử","ữ","ự",
            "ý","ỳ","ỷ","ỹ","ỵ",};
            string[] arr2 = new string[] { "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a",
            "d",
            "e","e","e","e","e","e","e","e","e","e","e",
            "i","i","i","i","i",
            "o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o","o",
            "u","u","u","u","u","u","u","u","u","u","u",
            "y","y","y","y","y",};
            for (int i = 0; i < arr1.Length; i++)
            {
                text = text.Replace(arr1[i], arr2[i]);
                text = text.Replace(arr1[i].ToUpper(), arr2[i].ToUpper());
            }
            return text;
        }

        public bool CompareString(string str1, string str2)
        {
            var check = (RemoveSign(str1).ToLower().Contains(RemoveSign(str2).ToLower()));
            return check;
        }
    }
}