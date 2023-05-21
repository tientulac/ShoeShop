import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent extends BaseComponent implements OnInit {

  AddForm = new FormGroup({
    discount_code: new FormControl(null),
    discount_name: new FormControl(null),
    value: new FormControl(null),
    created_at: new FormControl(null),
    start_date: new FormControl(null),
    end_date: new FormControl(null),
    status: new FormControl(1),
  })

  ngOnInit(): void {
    this.getListDiscount();
  }

  showConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.discountService.delete(id).subscribe(
          (res) => {
            if (res) {
              this.toastr.success('Delete Success !');
              this.getListDiscount();
            }
            else {
              this.toastr.warning('Delete Fail !');
              this.getListDiscount();
            }
          }
        )
      }
    });
  }

  showAddModal(title: any, dataEdit: any): void {
    this.isDisplay = true;
    this.titleModal = title;
    this.selected_ID = 0;
    if (dataEdit != null) {
      this.selected_ID = dataEdit.discount_id;
      this.AddForm.patchValue({
        discount_code: !dataEdit ? '' : dataEdit.discount_code,
        discount_name: !dataEdit ? '' : dataEdit.discount_name,
        value: !dataEdit ? '' : dataEdit.value,
        created_at: !dataEdit ? '' : dataEdit.created_at,
        end_date: !dataEdit ? '' : dataEdit.end_date,
        start_date: !dataEdit ? '' : dataEdit.start_date,
        status: !dataEdit ? 1 : dataEdit.status,
      });
    }
    else {
      this.AddForm.reset();
      this.AddForm.patchValue({
        status: 1,
      });
    }
  }

  handleOk(): void {
    var req = {
      discount_id: this.selected_ID,
      discount_code: this.AddForm.value.discount_code,
      discount_name: this.AddForm.value.discount_name,
      value: this.AddForm.value.value,
      created_at: this.AddForm.value.created_at,
      end_date: this.AddForm.value.end_date,
      start_date: this.AddForm.value.start_date,
      status: this.AddForm.value.status,
    }
    this.discountService.save(req).subscribe(
      (res) => {
        if (res) {
          this.toastr.success('Success !');
          this.getListDiscount();
        }
        else {
          this.toastr.success('Fail !');
        }
      }
    );
    this.isDisplay = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isDisplay = false;
  }
}
