import { Dish } from "./dish"

export interface Cart {
    userId:number,
    dishTitle:string,
    dishId:number,
    count:number,
    dish:Dish,
    price:number,
    id?:number
}
