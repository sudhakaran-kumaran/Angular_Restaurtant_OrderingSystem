import { Component } from '@angular/core';
import { Order } from 'src/app/model/order';
import { Orderstatus } from 'src/app/model/orderstatus';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent {
  error:string='';
  orders:Order[]=[];
  userOrders:Order[]=[];
  orderStatusList:Orderstatus[]=[];

  userId:number | undefined;
  orderId : number | undefined;
  statusId : number | undefined;
  constructor(private orderService:OrderService){}
  ngOnInit(): void {
    // this.orderService.getUserOrder();
    console.log(this.orders);
    
    this.orderService.getAllOrders().subscribe({
    
      
      next:(response:any)=>{
        this.orders=response.data
      },error:(err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message
      }
    })
  }
  getAllOrders() : void{
    this.orderService.getAllOrders().subscribe((response:any)=>{
      this.orders=response.data;
    })

  }
  updateOrderStatus() : void{
    if(this.orderId!==undefined && this.statusId!==undefined){
      const orderStatusRequest={
        orderId:this.orderId,
        statusId:this.statusId
      }
    };
    this.orderService.updateOrderStatus().subscribe((response:any)=>[
      
    ])

  }
  getUsersOrder(id:number) : void{
    if(this.userId !== undefined){
      this.orderService.getUserOrder(id).subscribe((response:any)=>{
        this.userOrders=response.data;
      })
    }

  }
  getAllOrderStatus() : void{
    this.orderService.getAllOrderStatus().subscribe((response:any)=>{
      this.orderStatusList=response.data;
    })

  }
}
