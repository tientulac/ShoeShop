using ClothesShopMale.Models;
using ClothesShopMale.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace ClothesShopMale.Controllers
{
    public class OrderController : ApiController
    {
        private LinqDataContext db = new LinqDataContext();

        [HttpGet]
        [Route("api/v1/order")]
        public ResponseBase<List<sp_LoadOrderResult>> GetList()
        {
            try
            {
                //var list = db.Orders.Where(x => x.type == 1).Select(o => new OrderDTO
                //{
                //    order_id = o.order_id,
                //    account_id = o.account_id.GetValueOrDefault(),
                //    cusomter_type = o.cusomter_type,
                //    order_code = o.order_code,
                //    seller = o.seller,
                //    phone_seller = o.phone_seller,
                //    coupon = o.coupon.GetValueOrDefault(),
                //    payment_type = o.payment_type.GetValueOrDefault(),
                //    bought_type = o.bought_type,
                //    waiting = o.waiting.GetValueOrDefault(),
                //    data_cart = o.data_cart,
                //    address = o.address,
                //    full_name = o.full_name,
                //    note = o.note,
                //    order_item = o.order_item,
                //    phone = o.phone,
                //    status = o.status.GetValueOrDefault(),
                //    type_payment = o.type_payment.GetValueOrDefault(),
                //    fee_ship = o.fee_ship.GetValueOrDefault(),
                //    id_city = o.id_city.GetValueOrDefault(),
                //    id_district = o.id_district.GetValueOrDefault(),
                //    id_ward = o.id_ward.GetValueOrDefault(),
                //    total = o.total.GetValueOrDefault(),
                //    created_at = o.created_at.GetValueOrDefault(),
                //    updated_at = o.updated_at.GetValueOrDefault(),
                //    deleted_at = o.deleted_at.GetValueOrDefault(),
                //    type = o.type.GetValueOrDefault()
                //}).ToList();

                return new ResponseBase<List<sp_LoadOrderResult>>
                {
                    data = db.sp_LoadOrder().ToList(),
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<sp_LoadOrderResult>>
                {
                    status = 500
                };
            }
        }

        [HttpPost]
        [Route("api/v1/order")]
        public ResponseBase<bool> Save(Order req)
        {
            try
            {
                req.created_at = DateTime.Now;
                req.type = 1;
                db.Orders.InsertOnSubmit(req);
                db.SubmitChanges();
                return new ResponseBase<bool>
                {
                    data = true,
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
        [Route("api/v1/order/cancle/{id}")]
        public ResponseBase<bool> Cancle(int id = 0)
        {
            try
            {
                var ord = db.Orders.Where(x => x.order_id == id).FirstOrDefault();
                ord.status = 4;
                ord.deleted_at = DateTime.Now;
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
        [Route("api/v1/order/{id}")]
        public ResponseBase<bool> Delete(int id = 0)
        {
            try
            {
                var ord = db.Orders.Where(x => x.order_id == id).FirstOrDefault();
                ord.status = 4;
                ord.deleted_at = DateTime.Now;
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
        [Route("api/v1/order/updateStatus/{id}/{status}")]
        public ResponseBase<bool> UpdateStatus(int id = 0, int status = 0)
        {
            try
            {
                var ord = db.Orders.Where(x => x.order_id == id).FirstOrDefault();
                ord.status = status;
                ord.updated_at = DateTime.Now;
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


        [HttpPost]
        [Route("api/v1/order/orderByFilter")]
        public ResponseBase<List<sp_LoadOrderResult>> GetByFitler(FilterOrder req)
        {
            try
            {
                List<sp_LoadOrderResult> result = db.sp_LoadOrder().ToList();
                if (req.status > 0)
                {
                    result = result.Where(x => x.status == req.status).ToList();
                }

                return new ResponseBase<List<sp_LoadOrderResult>>
                {
                    data = result,
                    status = 200
                };
            }
            catch (Exception ex)
            {
                return new ResponseBase<List<sp_LoadOrderResult>>
                {
                    status = 500
                };
            }
        }
    }
}