import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent extends BaseComponent implements OnInit {

  @Input() id_input: any = 0; 
  dataImage: any = [];
  img_link: any;

  ngOnInit(): void {
    this.getListImage();
  }

  getListImage() {
    this.productService.getImage().subscribe(
      (res) => {
        this.dataImage = res.data.filter((x: any) => x.product_id == this.id_input);
      }
    );
  }

  addImage() {
    let req = {
      product_id: this.id_input,
      image: this.img_link
    }
    this.productService.insertImage(req).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success('Success !');
          this.getListImage();
        }
        else {
          this.toastr.warning('Failed !');
        }
      }
    );
  }

  showConfirm(id: any): void {
    this.productService.deleteImage(id).subscribe(
      (res) => {
        if (res.status == 200) {
          this.toastr.success('Delete Success !');
          this.getListImage();
        }
        else {
          this.toastr.warning('Delete Fail !');
          this.getListImage();
        }
      }
    )
  }
}
