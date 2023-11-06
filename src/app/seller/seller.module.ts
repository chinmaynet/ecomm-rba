import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';
import { MatCardModule } from '@angular/material/card';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EditProductDialogComponent } from './edit-product-dialog/edit-product-dialog.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@NgModule({
  declarations: [SellerAuthComponent, SellerHomeComponent, SellerAddProductComponent, DeleteDialogComponent, EditProductDialogComponent],
  imports: [MatTooltipModule, MatDialogModule, MatListModule, MatSnackBarModule, MatPaginatorModule, MatTableModule, MatGridListModule, MatSortModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatSidenavModule, MatAutocompleteModule, MatBadgeModule, MatButtonToggleModule, MatRadioModule, MatCheckboxModule, MatIconModule
    ,ReactiveFormsModule,FormsModule,CommonModule, MatCardModule, MatFormFieldModule, ReactiveFormsModule,
    SellerRoutingModule ,SlickCarouselModule
  ]
})
export class SellerModule { }
