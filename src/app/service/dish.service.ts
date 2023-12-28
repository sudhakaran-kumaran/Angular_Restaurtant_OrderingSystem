import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Dish } from '../model/dish';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(private http: HttpClient) {}

  updateDish(editDish : FormData) : Observable<AppResponse>{
    return this.http.put<AppResponse>(`${urlEndpoint.baseUrl}/admin/dish/update`,editDish);
  }
  deleteDish(id:number) : Observable<AppResponse> {
    return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/admin/dish/${id}`);
  }
  addDish(addDish: FormData): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      `http://localhost:8080/api/admin/dish/create`,
      addDish
    );
  }
  getAllDish(): Observable<AppResponse> {
    console.log("hiii iam selvin");
    
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/dish/all`);
  }
}
