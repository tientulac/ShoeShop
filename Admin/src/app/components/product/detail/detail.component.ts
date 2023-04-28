import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends BaseComponent implements OnInit {

  @Input() id_input: any = 0; 
  dataDetail: any = [];
  _detail: any;

  ngOnInit(): void {
    this.getListDetail();
  }

  getListDetail() {
    this.productService.getDetail().subscribe(
      (res) => {
        this.dataDetail = res.data.filter((x: any) => x.product_id == this.id_input);
      }
    );
  }

  addDetail() {
    let req = {
      product_id: this.id_input,
      detail: this._detail
    }
    this.productService.insertDetail(req).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success('Success !');
          this.getListDetail();
        }
        else {
          this.toastr.success('Failed !');
        }
      }
    );
  }

  showConfirm(id: any): void {
    this.productService.deleteDetail(id).subscribe(
      (res) => {
        if (res) {
          this.toastr.success('Delete Success !');
          this.getListDetail();
        }
        else {
          this.toastr.warning('Delete Fail !');
          this.getListDetail();
        }
      }
    )
  }
}
