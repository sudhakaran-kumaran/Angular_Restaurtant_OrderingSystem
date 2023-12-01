import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Order } from '../model/order';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService  {
  
  postOrder(order:Order) : Observable<AppResponse> {
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/order`,order);
  }
  updateOrderStatus() : Observable<AppResponse> {
    throw new Error('Method not implemented.');
  }
  getAllOrderStatus() : Observable<AppResponse> {
    throw new Error('Method not implemented.');
  }
  getUserOrder(id:number) : Observable<AppResponse> {
    const userId=this.storageService.getLoggedInUser().id;
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/order/${userId}`);
  }
  constructor(private http:HttpClient,private storageService:StorageService){}
  getAllOrders():Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/order/all`);
  }
  // getUserOrder():Observable<AppResponse>{
  //   return this.http.get<AppResponse>('${urlEndpoint.baseUrl}/order/id?')
  // }
  
}
