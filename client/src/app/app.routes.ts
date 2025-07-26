import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { BasketModule } from './basket/basket.module';
import { ShopModule } from './shop/shop.module';
import { CheckoutModule } from './checkout/checkout.module';
import { ShopComponent } from './shop/shop.component';
import { AccountModule } from './account/account.module';
import { AuthGuard } from './core/guards/auth.guard';
import { OrdersComponent } from './orders/orders.component';
import { OrdersModule } from './orders/orders.module';


export const routes: Routes = [
    {
        path:'',component:HomeComponent , data:{breadcrumb:'Home'}
    },
    {//lazy loading
        path:"shop",loadChildren:() => ShopModule,data:{breadcrumb:'Shop'}
    },
    {//lazy loading
        path:"basket",loadChildren: () => BasketModule,data:{breadcrumb:'Basket'}
    },
    /*
    {//lazy loading
        path:"checkout",loadChildren: () => import("./checkout/checkout.module").then(mod => mod.CheckoutModule),data:{breadcrumb:'Checkout'}
    },
    */
   {
    path:'orders' , loadChildren: () => OrdersModule , data:{breadcrumb:'Orders'}
   },
   {
    path:'account', canActivate:[AuthGuard] ,loadChildren: () => AccountModule , data:{breadcrumb: {skip : true}}
   },
   {
    path:"checkout" , 
    canActivate :[AuthGuard],
    loadChildren: () => CheckoutModule, data:{breadcrumb:'Checkout'}
   },
    { path:"test-error" , component:TestErrorComponent , data:{breadcrumb:'Test Errors'}},
    { path:"server-error" , component:ServerErrorComponent ,data:{breadcrumb:'Sever Errors'}},
    { path:"not-found" , component:NotFoundComponent , data:{breadcrumb:'Not Found'}},
    {
        path:'**',redirectTo:'not-found',pathMatch:'full'
    },
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{ }
