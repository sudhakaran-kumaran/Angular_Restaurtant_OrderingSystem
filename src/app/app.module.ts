import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { LoaderInterceptorService } from './service/interceptor/loaderInterceptor.service';
import { AuthInterceptorService } from './service/interceptor/authInterceptor.service';
import { DishComponent } from './component/dish/dish.component';
import { CartComponent } from './component/cart/cart.component';
import { CategoryComponent } from './component/admin/category/category.component';
import { UserComponent } from './component/user/user.component';
import { TableComponent } from './component/table/table.component';
import { BrowserModule } from '@angular/platform-browser';
import { NavComponent } from './component/nav/nav.component';
import { AdmindishComponent } from './component/admin/admindish/admindish.component';
import { OrderComponent } from './component/admin/order/order.component';
import { IntroComponent } from './component/intro/intro.component';
import { IonicModule } from '@ionic/angular';
import { UserorderComponent } from './component/userorder/userorder.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    AdmindishComponent,
    DishComponent,
    CartComponent,

    CategoryComponent,
    UserorderComponent,
    UserComponent,
    TableComponent,
    NavComponent,
    OrderComponent,
    IntroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    IonicModule.forRoot({}),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
