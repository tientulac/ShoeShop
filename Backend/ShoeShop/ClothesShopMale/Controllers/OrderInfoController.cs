using ClothesShopMale.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ClothesShopMale.Controllers
{
    public class OrderInfoController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpPost]
        [Route("api/v1/orderInfor/filter")]
        public ResponseBase<List<OrderInfo>> GetList(FilterOrderInfo req)
        {
            try
            {
                var list = db.OrderInfos.ToList();
                if (req != null)
                {
                    if (!String.IsNullOrEmpty(req.order_code))
                    {
                        list = list.Where(x => x.order_code.ToLower().Contains(req.order_code)).ToList();
                    }
                    if (req.from_date != null)
                    {
                        list = list.Where(x => x.created_at >= req.from_date).ToList();
                    }
                    if (req.to_date != null)
                    {
                        list = list.Where(x => x.created_at <= req.to_date).ToList();
                    }
                }
                return new ResponseBase<List<OrderInfo>>
                {
                    data = list,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<OrderInfo>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/orderInfor")]
        public ResponseBase<OrderInfo> Save(OrderInfo req)
        {
            try
            {
                if (req.order_infor_id > 0)
                {
                    var order = db.OrderInfos.Where(x => x.order_infor_id == req.order_infor_id).FirstOrDefault();
                    order.phone = req.phone;
                    order.cusomter_type = req.cusomter_type;
                    order.seller = req.seller;
                    order.phone_seller = req.seller;
                    order.id_city = req.id_city;
                    order.id_district = req.id_district;
                    order.id_ward = req.id_ward;
                    order.address = req.address;
                    order.waiting = req.waiting;
                    order.note = req.note;
                    order.updated_at = DateTime.Now;
                    db.SubmitChanges();
                }
                else
                {
                    req.created_at = DateTime.Now;
                    db.OrderInfos.InsertOnSubmit(req);
                    db.SubmitChanges();
                }
                return new ResponseBase<OrderInfo>
                {
                    data = req,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<OrderInfo>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/orderInfor/updateItem")]
        public ResponseBase<OrderInfo> UpdateItem(OrderInfo req)
        {
            try
            {
                if (req.order_infor_id > 0)
                {
                    var order = db.OrderInfos.Where(x => x.order_infor_id == req.order_infor_id).FirstOrDefault();
                    order.data_cart = req.data_cart;
                    order.total = req.total;
                    db.SubmitChanges();
                }
                else
                {
                    return new ResponseBase<OrderInfo>
                    {
                        status = 500
                    };
                }
                return new ResponseBase<OrderInfo>
                {
                    data = req,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<OrderInfo>
                {
                    status = 500
                };
            }
        }

        [HttpGet]
        [Route("api/v1/orderInfor/cancleOrder/{order_infor_id}")]
        public ResponseBase<OrderInfo> CancleOrder(int order_infor_id = 0)
        {
            try
            {
                if (order_infor_id > 0)
                {
                    var order = db.OrderInfos.Where(x => x.order_infor_id == order_infor_id).FirstOrDefault();
                    order.status = 3;
                    db.SubmitChanges();
                }
                else
                {
                    return new ResponseBase<OrderInfo>
                    {
                        status = 500
                    };
                }
                return new ResponseBase<OrderInfo>
                {
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<OrderInfo>
                {
                    status = 500
                };
            }
        }

        [HttpDelete]
        [Route("api/v1/orderInfor/{id}")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var acc = db.OrderInfos.Where(x => x.order_infor_id == id).FirstOrDefault();
                db.OrderInfos.DeleteOnSubmit(acc);
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