import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserHomeComponent } from './user-home/user-home.component';
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
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    UserHomeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,MatTooltipModule, MatDialogModule, MatListModule, MatSnackBarModule, MatPaginatorModule, MatTableModule, MatGridListModule, MatSortModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatSidenavModule, MatAutocompleteModule, MatBadgeModule, MatButtonToggleModule, MatRadioModule, MatCheckboxModule, MatIconModule
    ,ReactiveFormsModule,FormsModule,CommonModule, MatCardModule, MatFormFieldModule, ReactiveFormsModule,
  ]
})
export class UserModule { }
