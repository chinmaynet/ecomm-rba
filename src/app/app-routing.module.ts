import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { SellerAuthComponent } from './seller/seller-auth/seller-auth.component';
// import { SellerHomeComponent } from './seller/seller-home/seller-home.component';
// import { authGuard } from './auth.guard';
import { AuthGuard } from './authentication/guards/auth.guard';
import { SearchComponent } from './search/search.component';
import { TestComponent } from './test/test.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
// import { SellerAddProductComponent } from './seller/seller-add-product/seller-add-product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'test', component: TestComponent },
  { path: 'checkout', component: CheckOutComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'search/:query', component: SearchComponent },
  { path: 'details/:productId', component: ProductDetailsComponent },
  { path: 'seller', loadChildren: () => import('./seller/seller.module').then((m) => m.SellerModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule) },
  {path:'user', loadChildren: () => import('./user/user.module').then((m)=> m.UserModule)},
  { path: 'user-auth', loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule) },
  // { path: 'seller-add-product', component: SellerAddProductComponent, canActivate: [AuthGuard] },
  // { path: 'seller-auth', component: SellerAuthComponent },
  // { path: 'seller-home', component: SellerHomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
