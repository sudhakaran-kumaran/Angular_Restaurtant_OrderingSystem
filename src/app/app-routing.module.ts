import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { authGuard } from './guard/auth.guard';
import { DishComponent } from './component/dish/dish.component';

import { CategoryComponent } from './component/admin/category/category.component';

import { CartComponent } from './component/cart/cart.component';

import { UserComponent } from './component/user/user.component';
import { TableComponent } from './component/table/table.component';
import { AdmindishComponent } from './component/admin/admindish/admindish.component';
import { OrderComponent } from './component/admin/order/order.component';
import { IntroComponent } from './component/intro/intro.component';
import { UserorderComponent } from './component/userorder/userorder.component';




const routes: Routes = [
  {path:'user',component:UserComponent},
  {path:'table',component:TableComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  {path:'dish',component:DishComponent},
  { path: 'home', component: HomeComponent},
  { path: 'admin', component: AdminHomeComponent},
  {path:'admincategory',component:CategoryComponent},
  {path:'cart',component:CartComponent},
  {path:'admindish',component:AdmindishComponent},
  {path:'order',component:OrderComponent},
  {path:'',component:IntroComponent},
  {path:'userorder',component:UserorderComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
