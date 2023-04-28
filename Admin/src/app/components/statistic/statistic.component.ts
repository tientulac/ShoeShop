import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent extends BaseComponent implements OnInit {

  chart: any;
  total_price: any = 0;
  count_user: any;
  count_product: any;
  transaction: any;

  ngOnInit(): void {
    this.createChart();
    this.getListAccount();
    this.getListProduct();
    this.getListOrder();
    this.productService.getList().subscribe(
      (res) => {
        var total = 0;
        this.listProduct = res;
        this.listProduct.forEach((x: any) => {
          if (x.price > 0) {
            total = total + x.price;
          }
        })
        this.total_price = total;
      });
  }

  exportExcel() {
    this.excelService.exportAsExcelFile(this.listAccount, 'accounts');
  }

  createChart() {
    this.productService.getList().subscribe(
      (res) => {
        this.listProduct = res;
        this.total_price = this.listProduct.forEach((x: any) => {
          console.log(x.price);
          if (x.price > 0) {
            this.total_price += x.price;
          }
        });
        this.chart = new Chart('MyChart', {
          type: 'bar',
          data: {
            labels: this.listProduct.map((x: any) => x.product_name),
            datasets: [
              {
                data: this.listProduct.map((x: any) => x.price),
                borderColor: '#3cb371',
                backgroundColor: "#17a2b8",
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
      }
    )

  }

}
