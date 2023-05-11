using ClothesShopMale.Models;
using ClothesShopMale.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ClothesShopMale.Controllers
{
    public class ProductController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/product")]
        public ResponseBase<List<ProductDTO>> GetList()
        {
            try
            {
                return new ResponseBase<List<ProductDTO>>
                {
                    data = (from a in db.Products
                            select new ProductDTO
                            {
                                product_id = a.product_id,
                                amount = a.amount,
                                brand_id = a.brand_id,
                                category_id = a.category_id,
                                origin = a.origin,
                                price = a.price,
                                product_name = a.product_name,
                                size = a.size,
                                status = a.status,
                                created_at = a.created_at,
                                updated_at = a.updated_at,
                                deleted_at = a.deleted_at,
                                product_code = a.product_code,
                                category_name = db.Categories.Where(x => x.category_id == a.category_id).FirstOrDefault().category_name ?? "",
                                brand_name = db.Brands.Where(x => x.brand_id == a.brand_id).FirstOrDefault().brand_name ?? "",
                                color = db.ProductColors.FirstOrDefault(x => x.product_id == a.product_id).color != null ? db.ProductColors.FirstOrDefault(x => x.product_id == a.product_id).color : "" 
                            }).ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<ProductDTO>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/productByFilter")]
        public ResponseBase<List<ProductDTO>> GetByFitler(FilterProduct req)
        {
            try
            {
                var list = (from a in db.Products
                            select new ProductDTO
                            {
                                product_id = a.product_id,
                                amount = a.amount,
                                brand_id = a.brand_id,
                                category_id = a.category_id,
                                origin = a.origin,
                                price = a.price,
                                product_name = a.product_name,
                                size = a.size,
                                status = a.status,
                                created_at = a.created_at,
                                updated_at = a.updated_at,
                                deleted_at = a.deleted_at,
                                product_code = a.product_code,
                                category_name = db.Categories.Where(x => x.category_id == a.category_id).FirstOrDefault().category_name ?? "",
                                brand_name = db.Brands.Where(x => x.brand_id == a.brand_id).FirstOrDefault().brand_name ?? "",
                            });
                if (!string.IsNullOrEmpty(req.fitlerPrice))
                {
                    if (req.fitlerPrice.Equals("gt500"))
                    {
                        list = list.Where(x => x.price > 500000);
                    }
                    if (req.fitlerPrice.Equals("lt500"))
                    {
                        list = list.Where(x => x.price < 500000);
                    }
                    if (req.fitlerPrice.Equals("gt1000"))
                    {
                        list = list.Where(x => x.price > 1000000);
                    }
                }
                if (req.brand_id > 0)
                {
                    list = list.Where(x => x.brand_id == req.brand_id);
                }
                if (req.category_id > 0)
                {
                    list = list.Where(x => x.category_id == req.category_id);
                }
                return new ResponseBase<List<ProductDTO>>
                {
                    data = list.ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<ProductDTO>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/product")]
        public ResponseBase<Product> Save(ProductDTO req)
        {
            try
            {
                if (req.product_id > 0)
                {
                    var product = db.Products.Where(x => x.product_id == req.product_id).FirstOrDefault();
                    product.amount = req.amount;
                    product.brand_id = req.brand_id;
                    product.category_id = req.category_id;
                    product.origin = req.origin;
                    product.price = req.price;
                    product.product_name = req.product_name;
                    product.size = req.size;
                    product.status = req.status;
                    product.updated_at = DateTime.Now;
                    product.product_code = req.product_code;
                    db.SubmitChanges();
                    var colors = db.ProductColors.Where(x => x.product_id == req.product_id);
                    db.ProductColors.DeleteAllOnSubmit(colors);
                    db.ProductColors.InsertOnSubmit(new ProductColor()
                    {
                        product_id = req.product_id,
                        color = req.color
                    });
                    db.SubmitChanges();
                }
                else
                {
                    var _product = new Product();
                    _product.amount = req.amount;
                    _product.brand_id = req.brand_id;
                    _product.category_id = req.category_id;
                    _product.origin = req.origin;
                    _product.price = req.price;
                    _product.product_name = req.product_name;
                    _product.size = req.size;
                    _product.status = req.status;
                    _product.created_at = DateTime.Now;
                    _product.product_code = req.product_code;
                    _product.status = 1;
                    db.Products.InsertOnSubmit(_product);
                    db.SubmitChanges();
                    db.ProductColors.InsertOnSubmit(new ProductColor() { 
                        product_id = _product.product_id,
                        color = req.color
                    });
                    db.SubmitChanges();
                }
                return new ResponseBase<Product>
                {
                    data = req,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<Product>
                {
                    status = 500
                };
            }
        }

        [HttpDelete]
        [Route("api/v1/product/{id}")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var acc = db.Products.Where(x => x.product_id == id).FirstOrDefault();
                db.Products.DeleteOnSubmit(acc);
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

        [HttpGet]
        [Route("api/v1/product/sizes")]
        public ResponseBase<List<SizeDTO>> GetListSize()
        {
            try
            {
                var data = db.Products.Select(x => x.size).ToList() ?? new List<string>();
                var listString = new List<string>();
                var listResult = new List<SizeDTO>();
                var count = 0;
                if (data.Count > 0)
                {
                    data.ForEach(x =>
                    {
                        var size = x.Split(',');
                        listString.AddRange(size);
                    });
                }

                if (listString.Count > 0)
                {
                    foreach (var str in listString.Distinct())
                    {
                        count++;
                        listResult.Add(new SizeDTO
                        {
                            id = count,
                            name = str,
                            size = str
                        });
                    }
                }

                return new ResponseBase<List<SizeDTO>>
                {
                    data = listResult.Distinct().OrderBy(x => x.size).ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<SizeDTO>>
                {
                    status = 500
                };
            }
        }
    }
}