import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig, AppConfiguration } from 'src/configuration';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(@Inject(AppConfig) private readonly appConfig: AppConfiguration, private router: Router, private http: HttpClient) { }

  getList(): Observable<any> {
    return this.http
      .get<any>(this.appConfig.API + 'api/v1/order')
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  delete(id: any): Observable<any> {
    return this.http
      .delete<any>(this.appConfig.API + 'api/v1/order/' + id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  updateStatus(id: any, status: any): Observable<any> {
    return this.http
      .get<any>(this.appConfig.API + `api/v1/order/updateStatus/${id}/${status}`)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  createOrderInfor(req: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + `api/v1/order/orderInfor`, req)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  getOrderInfor(): Observable<any> {
    return this.http
      .get<any>(this.appConfig.API + `api/v1/order/orderInfor`)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  deleteOrderInfor(id: any): Observable<any> {
    return this.http
      .delete<any>(this.appConfig.API + 'api/v1/orderInfor/' + id)
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
}
