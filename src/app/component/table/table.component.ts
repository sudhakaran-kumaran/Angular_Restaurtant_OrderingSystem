import { Component, OnInit } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { Table } from 'src/app/model/table';
import { TableService } from 'src/app/service/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  
})
export class TableComponent implements OnInit{
  error:string='';
  tables:Table[]=[];
  userId:number=0;
  createdAt:string='';
  
  constructor(private tableService:TableService){}
  ngOnInit(): void {
    console.log(this.tables);
    
    this.tableService.getAllTableDetails().subscribe({
      next:(response:any)=>{
        this.tables.push(response.data.tableRequest);
      },
      error:(err)=>{
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message
       }
    })
  }
  // addTable(form:any):void{
  //   const table:Table={
  //     userId: this.userId,
  //     id: 0,
  //     createdAt: ''
  //   };
  //   this.tableService.addTable(table).subscribe({
  //     next:(response:AppResponse)=>{
  //       this.tables.push(response.data);
  //       this.ngOnInit();
  //     }
  //   })
  // }

}
