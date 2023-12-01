import { OrderedDish } from "./ordered-dish";
import { Table } from "./table";

export interface Order {
    id?:number;
    orderedDish?:OrderedDish[];
    userId:number;
    tableId?:number,
    userName?:String;
    name?: String;
    table?:Table;
    statusID?:number;
    orderStatus?:String;
    
}
