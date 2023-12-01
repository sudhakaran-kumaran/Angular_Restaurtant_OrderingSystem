import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { AppResponse } from '../model/appResponse';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  
  constructor(private http: HttpClient) {}

  getUserCategory(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/dish/all`);
  }
}

