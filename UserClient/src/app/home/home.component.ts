import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../components/base/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

  //Slider settings
  slideConfig = {"slidesToShow": 1, "slidesToScroll": 1} ;
  lstColor: any;
  lstSize: any;
  lstProductSeller: any;
  lstProductNew: any;

  ngOnInit(): void {
    this.getListCate();
    this.getListProduct();
    this.getProductImage();
    this.getProductColor();
    this.getListProductSeller();
  }

  passingData(prod: any) {
    this.lstSize = prod.size.split(',');
    this.lstColor = [...new Set(this.listColor.filter((x: any) => x.product_id == prod.product_id).map((c: any) => c.color))];
    localStorage.setItem('lstSize', JSON.stringify(this.lstSize));
    localStorage.setItem('lstColor', JSON.stringify(this.lstColor));
  }

  getListProductSeller() {
    this.productService.getList().subscribe(
      (res) => {
        if (res.data.length > 0) {
          this.lstProductSeller = res.data.sort((a: any, b: any) => (a.amount > b.amount) ? 1 : -1);
          this.lstProductSeller = this.lstProductSeller.slice(0,5);
          this.lstProductNew = res.data.sort((a: any, b: any) => (a.product_id < b.product_id) ? 1 : -1);
          this.lstProductNew = this.lstProductNew.slice(0,5);
        }
      }
    )
  }
}
