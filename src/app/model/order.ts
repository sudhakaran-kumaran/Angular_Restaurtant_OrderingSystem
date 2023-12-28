import { FileType } from "./file-type";
import { OrderedDish } from "./ordered-dish";
import { Table } from "./table";

export interface Order {
    id?:number;
    dishList?:OrderedDish[];
    userId:number;
    tableId?:number,
    username?:String;
    name?: String;
    table?:Table;
    statusID?:number;
    orderStatus?:number;
    photo?:FileType;
    createdAt?:string;
    
}
