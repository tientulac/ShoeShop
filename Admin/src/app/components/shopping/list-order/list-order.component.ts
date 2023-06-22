import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})

export class ListOrderComponent extends BaseComponent implements OnInit {

  code_search: any = '';
  from_search: any = null;
  to_search: any = null;
  selectedOption: any;

  isEditing: boolean = false;

  ngOnInit(): void {
    this.getListData();
    this.getListCity();
    this.getListProduct(null);
    this.getListAllProduct();
  }

  getListData() {
    var req = {
      from_date: this.from_search,
      to_date: this.to_search,
      order_code: this.code_search
    }
    this.orderService.getOrderInfor(req).subscribe(
      (res: any) => {
        this.listOrderInfo = res.data;
        this.listOrderInfo.forEach((x: any) => {
          if (x.id_ward) {
            x.id_ward = x.id_ward.toString();
            this.positionService.getListDistrict({ province_id: x.id_city }).subscribe(
              (res: any) => {
                x.listDistrict = res.data;
                this.positionService.getListWard({ district_id: x.id_district }).subscribe(
                  (res: any) => {
                    x.listWard = res.data;
                  }
                );
              }
            );
          }
        });
      }
    );
  }

  selectCity(id: any) {
    this.listOrderInfo.forEach((x: any) => {
      x.id_district = '';
      x.id_ward = '';
      x.id_ward = x.id_ward.toString();
      this.positionService.getListDistrict({ province_id: id }).subscribe(
        (res: any) => {
          x.listDistrict = res.data;
          this.positionService.getListWard({ district_id: x.id_district }).subscribe(
            (res: any) => {
              x.listWard = res.data;
            }
          );
        }
      );
    });
  }

  selectDistrict(id: any) {
    this.listOrderInfo.forEach((x: any) => {
      x.id_ward = x.id_ward.toString();
      this.positionService.getListDistrict({ province_id: x.id_city }).subscribe(
        (res: any) => {
          x.listDistrict = res.data;
          this.positionService.getListWard({ district_id: id }).subscribe(
            (res: any) => {
              x.listWard = res.data;
            }
          );
        }
      );
    });
  }

  save(hd: any) {
    if (hd.status) {
      hd.status = 5
    } else {
      hd.status = 3
    }
    this.orderService.createOrderInfor(hd).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.toastr.success('Thành công');
        }
        else {
          this.toastr.warning('Thất bại');
        }
      }
    )
  }

  // handleOk(): void {
  //   this.saveItem();
  //   this.isDisplay = false;
  // }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isDisplay = false;
  }

  sumCart() {
    this.total = 0;
    this.listProductCart.forEach((data: any) => {
      this.total += data.price * data.amountCart;
    });
  }

  showDetail(hd: any) {
    this.isDisplay = true;
    this.listProductCart = JSON.parse(hd.order_item);
    this.total = 0;
    this.sumCart();
    this.selected_ID = hd.order_id;
    this.status_order = hd.status;
  }

  changeSum() {
    this.sumCart();
  }

  showDeleteConfirm(hd: any): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc muốn xóa hóa đơn này?',
      nzContent: '<b style="color: red;">Hóa đơn ' + hd.order_code + '</b>',
      nzOkText: 'Xác nhận',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.orderService.deleteOrderInfor(hd.order_id).subscribe(
          (res: any) => {
            if (res.status == 200) {
              this.toastr.success('Thành công');
              this.getListData();
            }
            else {
              this.toastr.warning('Thất bại');
            }
          }
        );
      },
      nzCancelText: 'Đóng',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  showCancleConfirm(hd: any): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc muốn hủy hóa đơn này?',
      nzContent: '<b style="color: red;">Hóa đơn ' + hd.order_code + '</b>',
      nzOkText: 'Xác nhận',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.orderService.cancleOrderInfo(hd.order_id).subscribe(
          (res: any) => {
            if (res.status == 200) {
              this.toastr.success('Thành công');
              this.getListData();
            }
            else {
              this.toastr.warning('Thất bại');
            }
          }
        );
      },
      nzCancelText: 'Đóng',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  showConfirmDeleteItem(product: any): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc muốn xóa hóa đơn này?',
      nzContent: `<b style="color: red;">${product.product_code} - ${product.product_name}</b>`,
      nzOkText: 'Xác nhận',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.listProductCart = this.listProductCart.filter((x: any) => x.product_attribue_id != product.product_attribue_id);
        product.checked = false;
        this.checkProductCart(product.product_attribue_id);
        this.sumCart();
      },
      nzCancelText: 'Đóng',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  addToCart(): boolean {
    var p = this.listProduct.filter((x: any) => x.product_code == this.product_code)[0];
    p.amountCart = 1;
    if (this.listProductCart.filter((x: any) => x.product_code == p.product_code).length > 0) {
      this.toastr.warning('Sản phẩm này đã được thêm vào giỏ hàng !');
    }
    else {
      this.listProductCart.push(p);
    }
    this.sumCart();
    return true;
  }

  saveItem() {
    var req = {
      order_id: this.selected_ID,
      order_item: JSON.stringify(this.listProductCart),
      total: this.total,
    }
    this.orderService.updateItemOrderInfo(req).subscribe(
      (res: any) => {
        if (res.status == 200) {
          this.toastr.success('Thành công');
          this.getListData();
          this.sumCart();
          this.isDisplay = false;
        }
        else {
          this.toastr.success('Thất bại');
        }
      }
    );
  }

  changeAmount(p: any) {
    if (!p.checked) {
      this.listProductCart = this.listProductCart.filter((x: any) => x.product_attribute_id != p.product_attribute_id);
      this.total -= p.totalPayment;
    }
    else {
      p.amountCart = 1;
      p.totalPayment = 0;
      p.totalPayment = (p.price * p.amountCart);
      this.listProductCart.push(p);
      this.total += p.totalPayment;
    }
  }

  checkProductCart(product_attribute_id: any) {
    if (this.listProductCart.map((x: any) => x.product_attribue_id).includes(product_attribute_id)) {
      return false;
    }
    return true;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}
