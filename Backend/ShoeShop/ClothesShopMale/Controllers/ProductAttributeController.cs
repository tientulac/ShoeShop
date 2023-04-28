using ClothesShopMale.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ClothesShopMale.Controllers
{
    public class ProductAttributeController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/productattribute/color")]
        public ResponseBase<List<ProductColor>> GetListColor()
        {
            try
            {
                return new ResponseBase<List<ProductColor>>
                {
                    data = db.ProductColors.ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<ProductColor>>
                {
                    status = 500
                };
            }
        }

        [HttpGet]
        [Route("api/v1/productattribute/detail")]
        public ResponseBase<List<ProductDetail>> GetListDetail()
        {
            try
            {
                return new ResponseBase<List<ProductDetail>>
                {
                    data = db.ProductDetails.ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<ProductDetail>>
                {
                    status = 500
                };
            }
        }

        [HttpGet]
        [Route("api/v1/productattribute/image")]
        public ResponseBase<List<ProductImage>> GetListImage()
        {
            try
            {
                return new ResponseBase<List<ProductImage>>
                {
                    data = db.ProductImages.ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<ProductImage>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/productattribute/color")]
        public ResponseBase<ProductColor> SaveColor(ProductColor req)
        {
            try
            {
                db.ProductColors.InsertOnSubmit(req);
                db.SubmitChanges();
                return new ResponseBase<ProductColor>
                {
                    data = req,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<ProductColor>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/productattribute/detail")]
        public ResponseBase<ProductDetail> SaveDetail(ProductDetail req)
        {
            try
            {
                db.ProductDetails.InsertOnSubmit(req);
                db.SubmitChanges();
                return new ResponseBase<ProductDetail>
                {
                    data = req,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<ProductDetail>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/productattribute/image")]
        public ResponseBase<ProductImage> SaveImage(ProductImage req)
        {
            try
            {
                db.ProductImages.InsertOnSubmit(req);
                db.SubmitChanges();
                return new ResponseBase<ProductImage>
                {
                    data = req,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<ProductImage>
                {
                    status = 500
                };
            }
        }

        [HttpDelete]
        [Route("api/v1/productattribute/color/{id}")]
        public ResponseBase<bool> DeleteColor(int id = 0)
        {
            try
            {
                var acc = db.ProductColors.Where(x => x.product_color_id == id).FirstOrDefault();
                db.ProductColors.DeleteOnSubmit(acc);
                db.SubmitChanges();
                return new ResponseBase<bool>
                {
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<bool>
                {
                    status = 500
                };
            }
        }

        [HttpDelete]
        [Route("api/v1/productattribute/detail/{id}")]
        public ResponseBase<bool> DeleteDetail(int id = 0)
        {
            try
            {
                var acc = db.ProductDetails.Where(x => x.product_detail_id == id).FirstOrDefault();
                db.ProductDetails.DeleteOnSubmit(acc);
                db.SubmitChanges();
                return new ResponseBase<bool>
                {
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<bool>
                {
                    status = 500
                };
            }
        }

        [HttpDelete]
        [Route("api/v1/productattribute/image/{id}")]
        public ResponseBase<bool> DeleteImage(int id = 0)
        {
            try
            {
                var acc = db.ProductImages.Where(x => x.product_image_id == id).FirstOrDefault();
                db.ProductImages.DeleteOnSubmit(acc);
                db.SubmitChanges();
                return new ResponseBase<bool>
                {
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<bool>
                {
                    status = 500
                };
            }
        }
    }
}