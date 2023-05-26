import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends BaseComponent implements OnInit {

  accountName: any;

  selectedStatus: any = '';
  
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
    this.getListOrder();
  }

  isStatusDisabled(selectedStatus: number): boolean {
    if (selectedStatus === 1) {
      return this.statusOrder.status === 1; 
    }
    if (selectedStatus === 2) { 
      return this.statusOrder.status === 1 || this.statusOrder.status === 2; 
    }
    if (selectedStatus === 3) { 
      return this.statusOrder.status === 1 || this.statusOrder.status === 2 || this.statusOrder.status === 3; 
    }
    if(selectedStatus === 4){
      return this.statusOrder.status === 1 || this.statusOrder.status === 2 || this.statusOrder.status === 3 || this.statusOrder.status === 4;
    }
    else {
      return false;
    }
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
              this.getListOrder();
            }
            else {
              this.toastr.warning('Delete Fail !');
              this.getListOrder();
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
              this.getListOrder();
            }
            else {
              this.toastr.warning('Fail !');
              this.getListOrder();
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
}
