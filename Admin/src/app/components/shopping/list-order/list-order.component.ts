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

  ngOnInit(): void {
    this.getListData();
    this.getListCity();
  }

  getListData() {
    var req = {
      from_date: this.from_search,
      to_date: this.to_search,
      order_code: this.code_search
    }
    console.log(req);
    this.orderService.getOrderInfor(req).subscribe(
      (res: any) => {
        this.listOrderInfo = res.data;
        this.listOrderInfo.forEach((x: any) => {
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

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isDisplay = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isDisplay = false;
  }

  showDetail(hd: any) {
    this.isDisplay = true;
    this.listProductCart = JSON.parse(hd.data_cart);
  }

  showDeleteConfirm(hd: any): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc muốn xóa hóa đơn này?',
      nzContent: '<b style="color: red;">Hóa đơn ' + hd.order_code + '</b>',
      nzOkText: 'Xác nhận',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.orderService.deleteOrderInfor(hd.order_infor_id).subscribe(
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
}
