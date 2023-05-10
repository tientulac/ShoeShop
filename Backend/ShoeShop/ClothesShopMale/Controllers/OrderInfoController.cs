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

        [HttpGet]
        [Route("api/v1/orderInfor")]
        public ResponseBase<List<OrderInfo>> GetList()
        {
            try
            {
                return new ResponseBase<List<OrderInfo>>
                {
                    data = db.OrderInfos.ToList(),
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
                req.created_at = DateTime.Now;
                db.OrderInfos.InsertOnSubmit(req);
                db.SubmitChanges();
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