import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatListModule} from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialogModule} from '@angular/material/dialog';
// import { MatCarouselModule } from '@ngmodule/material-carousel';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { SearchComponent } from './search/search.component';
import { TestComponent } from './test/test.component';
// import { AddSellerComponent } from './add-seller/add-seller.component';

// import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LogoutDialogComponent,
    SearchComponent,
    TestComponent,
    // AddSellerComponent,
    // AdminHomeComponent,
  ],
  imports: [    SlickCarouselModule,
    BrowserModule,MatTooltipModule,MatDialogModule, MatListModule,MatSnackBarModule,FormsModule, MatPaginatorModule, MatTableModule, MatGridListModule, MatSortModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatSidenavModule, MatAutocompleteModule, MatBadgeModule, MatButtonToggleModule, MatRadioModule, MatCheckboxModule, MatIconModule,
    AppRoutingModule, ReactiveFormsModule, HttpClientModule,BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
