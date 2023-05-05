import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends BaseComponent implements OnInit {

  AddForm = new FormGroup({
    address: new FormControl(null),
    phone: new FormControl(null),
    full_name: new FormControl(null),
    email: new FormControl(null),
    admin: new FormControl(null),
    active: new FormControl(null),
    role_code: new FormControl(null),
    town: new FormControl(null),
    district: new FormControl(null),
    city: new FormControl(null),
    user_name: new FormControl(null),
    password: new FormControl(null),
  })

  ngOnInit(): void {
    this.getListAccount();
    this.getListRole();
    this.getPosition();
  }

  showConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.accountService.delete(id).subscribe(
          (res) => {
            if (res.status == 200) {
              this.toastr.success('Delete Success !');
              this.getListAccount();
            }
            else {
              this.toastr.warning('Delete Fail !');
              this.getListAccount();
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
      this.selected_ID = dataEdit.account_id;
      this.AddForm.patchValue({
        address: !dataEdit ? '' : dataEdit.address,
        phone: !dataEdit ? '' : dataEdit.phone,
        full_name: !dataEdit ? '' : dataEdit.full_name,
        email: !dataEdit ? '' : dataEdit.email,
        admin: !dataEdit ? '' : dataEdit.admin,
        active: !dataEdit ? '' : dataEdit.active,
        role_code: !dataEdit ? '' : dataEdit.role_code,
        city: !dataEdit ? '' : dataEdit.city,
        town: !dataEdit ? '' : dataEdit.town,
        district: !dataEdit ? '' : dataEdit.district,
      });
      this.selectCity();
    }
    else {
      this.AddForm.reset();
    }
  }

  handleOk(): void {
    var req = {
      account_id: this.selected_ID,
      address: this.AddForm.value.address,
      phone: this.AddForm.value.phone,
      full_name: this.AddForm.value.full_name,
      email: this.AddForm.value.email,
      admin: this.AddForm.value.admin,
      active: this.AddForm.value.active,
      role_code: this.AddForm.value.role_code,
      city: this.AddForm.value.city,
      town: this.AddForm.value.town,
      district: this.AddForm.value.district,
      user_name: this.AddForm.value.user_name,
      password: this.AddForm.value.password,
    }
    this.accountService.save(req).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success('Success !');
          this.getListAccount();
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

  selectCity() {
    this.listDistrict = this.listPosition.filter((x: any) => x.name == this.AddForm.value.city)[0].districts ?? null;
  }

  selectDistrict() {
    this.listTown = this.listDistrict.filter((x: any) => x.name == this.AddForm.value.district)[0].wards;
  }
}
