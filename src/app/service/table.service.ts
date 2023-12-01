import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { Table } from '../model/table';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  addTable(table: Table) : Observable<AppResponse> {
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/admin/create/table`,table);
  }

  constructor(private http:HttpClient) { }
  getAllTableDetails():Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/table/all`);
  }


}
