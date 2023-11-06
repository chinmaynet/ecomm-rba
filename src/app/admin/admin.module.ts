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
import { PieChartComponent } from './pie-chart/pie-chart.component';
// import { MatTableModule } from '@angular/material/table';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
@NgModule({
  declarations: [AdminHomeComponent, AddSellerComponent, PieChartComponent],
  imports: [
    CommonModule,MatCardModule,MatFormFieldModule,MatTableModule,MatPaginatorModule,MatSlideToggleModule,
    AdminRoutingModule,MatInputModule,MatSortModule,MatButtonModule,ReactiveFormsModule
  ]
})
export class AdminModule { }

// "node_modules/chart.js/dist/Chart.min.js"  // angular.json //styles