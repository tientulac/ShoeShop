import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../components/base/base.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent extends BaseComponent implements OnInit {

  paymentType: any;
  checkRole: any;

  full_name: any;
  city: any;
  address: any;
  phone: any;
  note: any;

  ngOnInit(): void {
    this.cartInfo = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('Cart'))));
    this.cartInfo.forEach((c: any) => {
      this.totalPrice += c.count * c.price;
    })
  }

  payment() {
    if (this.checkRole) {
      var req = {
        full_name: this.full_name,
        address: this.address,
        phone: this.phone,
        note: this.note,
        order_item: JSON.stringify(this.cartInfo),
        type_payment: 1,
        status: 1,
        account_id: JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('UserInfo')))).account_id,
      }
      this.orderService.insert(req).subscribe(
        (res) => {
          if (res) {
            this.toastr.success('Thành công !');
            localStorage.removeItem('Cart');
            this.router.navigate(['/']);
            setTimeout(window.location.reload.bind(window.location), 250);
          }
          else {
            this.toastr.warning('Thất bại !');
          }
        }
      );
    }
    else {
      this.toastr.warning('Bạn chưa đồng ý với các điểu khoản !');
    }
  }
}
