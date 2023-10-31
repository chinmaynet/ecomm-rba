import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../authentication/guards/auth.guard';
import { UserHomeComponent } from './user-home/user-home.component';
const routes: Routes = [{
  path: 'user-home', component: UserHomeComponent,
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
