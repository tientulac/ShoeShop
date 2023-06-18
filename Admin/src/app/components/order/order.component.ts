import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends BaseComponent implements OnInit {

  accountName: any;
  selectedStatus!: any;
  statusFilter: any;

  filterStatusOrder: any = [
    { status: 0, name: 'Chờ xác nhận' },
    { status: 1, name: 'Chờ lấy hàng' },
    { status: 2, name: 'Đang giao' },
    { status: 3, name: 'Hoàn thành' },
    { status: 4, name: 'Đã hủy' },
    { status: 5, name: 'Chờ thanh toán' },
  ]

  statusOrder: any = [
    { status: 1, name: 'Chờ lấy hàng' },
    { status: 2, name: 'Đang giao' },
    { status: 3, name: 'Hoàn thành' },
    { status: 4, name: 'Đã hủy' },
  ]

  ngOnInit(): void {
    this.getListOrder(this.getRequest());
  }

  getRequest() {
    return {
      order_code: this.order_code_search ?? '',
      full_name: this.customer_search ?? '',
      phone: this.phone_search ?? '',
      status: this.status_search ?? null,
      type_payment: this.payment_search ?? null,
      created_at: this.order_date_search ?? null,
      deleted_at: this.cancle_date_search ?? null
    }
  }
  checkStatus(order: any, selectedStatus: any) {
    this.modal.confirm({
      nzTitle: '<i>Bạn có muốn thay đổi trạng thái ?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.orderService.updateStatus(order.order_id, selectedStatus.status).subscribe(
          (res) => {
            if (res.status == 200) {
              this.toastr.success('Thành công !');
              this.getListOrder(this.getRequest());
              this.handleCancel();
            }
            else {
              this.toastr.warning('Thất bại !');
            }
          }
        )
      }
    });
  }

  showConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.orderService.delete(id).subscribe(
          (res) => {
            if (res.status == 200) {
              this.toastr.success('Delete Success !');
              this.getListOrder(this.getRequest());
            }
            else {
              this.toastr.warning('Delete Fail !');
              this.getListOrder(this.getRequest());
            }
          }
        )
      }
    });
  }

  confirmStatus(order: any, status: any) {
    this.modal.confirm({
      nzTitle: '<i>Bạn có chắc muốn cập nhật trạng thái đơn hàng này?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.orderService.updateStatus(order.order_id, status.status).subscribe(
          (res) => {
            if (res.status == 200) {
              this.toastr.success('Success !');
              this.getListOrder(this.getRequest());
            }
            else {
              this.toastr.warning('Fail !');
              this.getListOrder(this.getRequest());
            }
          }
        )
      }
    });
  }

  showDetail(hd: any) {
    this.isDisplay = true;
    this.orderInfo = hd;
    this.listProductCart = JSON.parse(hd.order_item);
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isDisplay = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isDisplay = false;
  }

  filter() {
    var req = {
      status: this.selectedStatus,
    }
    this.productService.getOrderByFilter(req).subscribe(
      (res) => {
        this.listOrder = res.data;
        console.log(res.data)
      }
    );
  }

  search() {
    this.getListOrder(this.getRequest());
  }

  setDisplayEdit(order: any): boolean {
    if ((order.status == 3) || (order.status == 4)) {
      return false;
    }
    return true;
  }
}
