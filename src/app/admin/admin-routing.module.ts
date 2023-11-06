import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AuthGuard } from '../authentication/guards/auth.guard';
import { RoleGuard } from '../authentication/guards/role.guard';
import { AdminRoleGuard } from './admin-role-guard.guard';
import { AddSellerComponent } from './add-seller/add-seller.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
const routes: Routes = [
  {path:'pie-chart', component: PieChartComponent, canActivate:[AuthGuard]},
  {
    path: 'admin-home', component: AdminHomeComponent, canActivate: [AuthGuard, RoleGuard, AdminRoleGuard], data: { requiredRole: 'admin' }
  },
  { path: 'add-seller', component: AddSellerComponent ,canActivate: [AuthGuard]}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
