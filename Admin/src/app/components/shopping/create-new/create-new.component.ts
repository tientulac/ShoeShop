import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewComponent extends BaseComponent implements OnInit {

  index = 0;
  tabs = [
    {
      name: 'Hóa đơn 1',
    }
  ];
  waitingPayment: any;
  paymentMethod: any;
  listDistrictFilter: any;
  listWardFilter: any;
  totalPayment: any = 0;

  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index, 1);
  }

  newTab(): void {
    let tab = {
      name: 'Hóa đơn ' + (this.tabs.length + 1),
    };
    this.tabs.push(
      tab
    );
    this.orderInfo.order_code = `HD${this.date.getDate()}${this.date.getMonth() + 1}${this.date.getFullYear()}${Math.random()}`;
    this.index = this.tabs.length - 1;
  }

  ngOnInit(): void {
    this.getListCity();
    this.getListProduct();
    this.refreshOrderInfo();
    this.orderInfo.order_code = `HD${this.date.getDate()}${this.date.getMonth() + 1}${this.date.getFullYear()}${Math.random()}`;
  }

  selectCity() {
    this.getListDistrict({ province_id: this.citySelected });
    this.orderInfo.id_city = this.citySelected;
  }

  selectDistrict() {
    this.getListWard({ district_id: this.districtSelected });
    this.orderInfo.id_district = this.districtSelected;
  }

  selectWard() {
    this.orderInfo.id_ward = this.townSelected;
  }

  addToCart(): boolean {
    this.productFilter = this.listProduct.filter((x: any) => x.product_code == this.product_code)[0];
    if (this.listProductCart.filter((x: any) => x.product_code == this.product_code).length > 0) {
      alert('Sản phẩm đã được thêm vào giỏ hàng');
      return false;
    }
    if (this.productFilter) {
      this.productFilter.amountCart = 1;
      this.productFilter.totalPayment = 0
      this.productFilter.totalPayment += this.productFilter.price * this.productFilter.amountCart;
      this.listProductCart.push(this.productFilter);
      this.totalPayment = this.listProductCart.map((o: any) => o.totalPayment).reduce((a: any, c: any) => { return a + c })
    }
    return true;
  }

  deleteCart(data: any) {
    this.listProductCart = this.listProductCart.filter((x: any) => x.product_id != data.product_id);
    this.totalPayment -= data.totalPayment;
  }

  changeAmount(data: any) {
    data.totalPayment = data.price * data.amountCart;
    this.totalPayment = this.listProductCart.map((o: any) => o.totalPayment).reduce((a: any, c: any) => { return a + c });
  }

  createOrder() {
    this.orderInfo.total = this.totalPayment;
    this.orderInfo.data_cart = JSON.stringify(this.listProductCart);
    this.orderService.createOrderInfor(this.orderInfo).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.toastr.success('Thành công !');
          this.refreshOrderInfo();
        }
        else {
          this.toastr.warning('Thất bại !');
        }
      }
    );
  }
}
