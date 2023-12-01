import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Category } from '../model/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  updateCategory(updateCategory:Category) : Observable<AppResponse> {
    return this.http.put<AppResponse>(`${urlEndpoint.baseUrl}/admin/category/update`,updateCategory);
  }
  constructor(private http : HttpClient) { }
  addCategory(addCategory: Category):Observable<AppResponse> {
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/admin/category/create`,addCategory);
  }

  
  getAllCategory():Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/category/all`);
  }
  deleteCategory(id:number):Observable<AppResponse>{
    return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/admin/category/${id}`);
  }
}
