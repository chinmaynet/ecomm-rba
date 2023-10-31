import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from '../authentication/guards/auth.guard';
import { RoleGuard } from '../authentication/guards/role.guard';
import { SellerRoleGuard } from './seller-role-guard.guard';
const routes: Routes = [
  { path: 'seller-add-product', component: SellerAddProductComponent, 
    canActivate: [AuthGuard] 
  },
  // { path: 'seller-auth', component: SellerAuthComponent },
  {
    path: 'seller-home', component: SellerHomeComponent,
    canActivate: [AuthGuard, SellerRoleGuard, RoleGuard], data: { requiredRole: 'seller' }
  },];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }