import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends BaseComponent implements OnInit {

  sizeSelected: any;
  SKU_code: any;
  size: NzSelectSizeType = 'default';
  multipleValue = [];
  sizeUpdate: any = '';
  newSize: any;

  selectedPrice!: any;
  selectedBrand!: any;
  selectedCate!: any;

  selectedIndex: any;

  checkboxForm = [
    {
      id: 1,
      name: 'Female',
      check: false
    },
    {
      id: 2,
      name: 'Male',
      check: false
    },
    {
      id: 3,
      name: 'Both',
      check: false
    },
  ];

  AddForm = new FormGroup({
    amount: new FormControl(null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]),
    brand_id: new FormControl(null, [Validators.required]),
    category_id: new FormControl(null, [Validators.required]),
    gender: new FormControl(null),
    origin: new FormControl(null, [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(1)]),
    product_name: new FormControl('', [Validators.required]),
    size: new FormControl(''),
    status: new FormControl(1),
  })

  ngOnInit(): void {
    this.getListProduct();
    this.getListCate();
    this.getListBrand();
    this.getProductImage();
  }

  showConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to delete these items?</i>',
      // nzContent: '<b>Some descriptions</b>',
      nzOnOk: () => {
        this.productService.delete(id).subscribe(
          (res) => {
            if (res.status == 200) {
              this.toastr.success('Delete Success !');
              this.getListProduct();
            }
            else {
              this.toastr.warning('Delete Fail !');
              this.getListProduct();
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
      this.selected_ID = dataEdit.product_id;
      this.AddForm.patchValue({
        amount: !dataEdit ? '' : dataEdit.amount,
        brand_id: !dataEdit ? '' : dataEdit.brand_id,
        category_id: !dataEdit ? '' : dataEdit.category_id,
        gender: !dataEdit ? '' : dataEdit.gender,
        origin: !dataEdit ? '' : dataEdit.origin,
        product_name: !dataEdit ? '' : dataEdit.product_name,
        price: !dataEdit ? '' : dataEdit.price,
        status: !dataEdit ? 1 : dataEdit.status,
        size: dataEdit.size ?? '',
      });
      this.sizeInput = dataEdit.size ?? '';
      this.colorInput = dataEdit.color ?? '';
      this.SKU_code = dataEdit.product_code;
      if (!(this.listOfOption.filter((x: any) => x == dataEdit.size).length > 0)) {
        this.listOfOption.push(dataEdit.size);
      }
      this.sizeSelected = dataEdit.size ?? '';
    }
    else {
      this.AddForm.reset();
      this.sizeInput = '';
      this.colorInput = '';
      this.AddForm.patchValue({
        status: 1,
      });
      this.SKU_code = btoa(Math.random().toString()).slice(0, 5);
    }
  }

  showImageModal(id: any): void {
    this.isDisplayImage = true;
    this.selected_ID = id;
  }

  showDetailModal(id: any): void {
    this.isDisplayDetail = true;
    this.selected_ID = id;
  }

  showColorModal(id: any): void {
    this.isDisplayColor = true;
    this.selected_ID = id;
  }

  handleOk(): void {
    if (this.AddForm.invalid) {
      this.AddForm.markAllAsTouched();
      return;
    }
    var req = {
      product_id: this.selected_ID,
      product_code: this.SKU_code,
      amount: this.AddForm.value.amount,
      brand_id: this.AddForm.value.brand_id,
      category_id: this.AddForm.value.category_id,
      gender: this.AddForm.value.gender,
      origin: this.AddForm.value.origin,
      product_name: this.AddForm.value.product_name,
      status: this.AddForm.value.status,
      price: this.AddForm.value.price,
      size: this.sizeSelected,
      color: this.colorInput
    }

    this.productService.save(req).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success('Success !');
          this.getListProduct();
        }
        else {
          this.toastr.success('Fail !');
        }
      }
    );
    this.isDisplay = false;
    this.isDisplayImage = false;
  }

  onItemChange(value: any) {
    console.log(" Value is : ", value);
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isDisplay = false;
    this.isDisplayImage = false;
    this.isDisplayDetail = false;
    this.isDisplayColor = false;
  }

  addSize() {
    if (this.listOfOption.filter((x: any) => x == this.newSize).length > 0) {
      this.toastr.warning('Kích cỡ này đã được thêm');
    }
    else {
      this.listOfOption.push(this.newSize);
    }
  }

  filter() {
    var req = {
      fitlerPrice: this.selectedPrice,
      brand_id: this.selectedBrand,
      category_id: this.selectedCate
    }
    this.productService.getByFilter(req).subscribe(
      (res) => {
        this.listProduct = res.data;
      }
    );
  }
}
