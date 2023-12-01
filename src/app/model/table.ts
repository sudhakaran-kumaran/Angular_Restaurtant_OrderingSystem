import { AppUser } from "./appUser";

export interface Table {
    id:number;
    appUser:{
        id:number,
        username:String
    };
    createdAt:string
}

