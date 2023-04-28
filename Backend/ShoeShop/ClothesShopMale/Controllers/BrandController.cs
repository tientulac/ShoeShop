using ClothesShopMale.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ClothesShopMale.Controllers
{
    public class BrandController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/brand")]
        public ResponseBase<List<Brand>> GetList()
        {
            try
            {
                return new ResponseBase<List<Brand>>
                {
                    data = db.Brands.ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<Brand>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/brand")]
        public ResponseBase<Brand> Save(Brand req)
        {
            try
            {
                if (req.brand_id > 0)
                {
                    var brand = db.Brands.Where(x => x.brand_id == req.brand_id).FirstOrDefault();
                    brand.brand_code = req.brand_code;
                    brand.brand_name = req.brand_name;
                    brand.image = req.image;
                    db.SubmitChanges();
                }
                else
                {
                    db.Brands.InsertOnSubmit(req);
                    db.SubmitChanges();
                }
                return new ResponseBase<Brand>
                {
                    data = req,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Brand>
                {
                    status = 500
                };
            }
        }

        [HttpDelete]
        [Route("api/v1/brand/{id}")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var acc = db.Brands.Where(x => x.brand_id == id).FirstOrDefault();
                db.Brands.DeleteOnSubmit(acc);
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