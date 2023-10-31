import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { MatTableModule } from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { AddSellerComponent } from './add-seller/add-seller.component';
import { ReactiveFormsModule } from '@angular/forms';
// import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [AdminHomeComponent, AddSellerComponent],
  imports: [
    CommonModule,MatCardModule,MatFormFieldModule,MatTableModule,MatPaginatorModule,
    AdminRoutingModule,MatInputModule,MatSortModule,MatButtonModule,ReactiveFormsModule
  ]
})
export class AdminModule { }
