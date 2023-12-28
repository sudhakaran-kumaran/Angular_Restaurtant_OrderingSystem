import { Category } from "./category"
import { FileType } from "./file-type"

export interface Dish {
    id:number,
    title:string,
    categoryId: number,
    description:string,
    price:number,
    photo?:FileType,
    count?:number
}
