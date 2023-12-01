import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  checkout(userId : number ) {
     return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/order`);

  }
  constructor(private http: HttpClient) {}

  getUserCart(userId: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/cart/${userId}`);
  }
  

  addCart(addCart: Cart): Observable<AppResponse> {
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/cart`,addCart);
  }
}
