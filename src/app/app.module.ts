import { NgModule, SecurityContext } from '@angular/core';
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
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
// import { MatCarouselModule } from '@ngmodule/material-carousel';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { SearchComponent } from './search/search.component';
import { TestComponent } from './test/test.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgChartsModule } from 'ng2-charts';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CatagoryComponent } from './catagory/catagory.component';
import { MarkdownModule } from 'ngx-markdown';
import {MatMenuModule} from '@angular/material/menu';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
// import { Canvas } from 'canvas';
// import { CanvasFontSpec } from 'chart.js';

// import { ChartsModule } from 'ng2-charts';

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
    ProductDetailsComponent,
    CartPageComponent,
    CheckOutComponent,
    MyOrdersComponent,
    CatagoryComponent,
    // AddSellerComponent,
    // AdminHomeComponent,
  ],
  imports: [MarkdownModule.forRoot({ sanitize: SecurityContext.NONE }),MatDatepickerModule,MatNativeDateModule,MatMenuModule, MatToolbarModule, SlickCarouselModule, NgChartsModule, FlexLayoutModule,
    BrowserModule, MatTooltipModule, MatDialogModule, MatListModule, MatSnackBarModule, FormsModule, MatPaginatorModule, MatTableModule, MatGridListModule, MatSortModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatSidenavModule, MatAutocompleteModule, MatBadgeModule, MatButtonToggleModule, MatRadioModule, MatCheckboxModule, MatIconModule,
    AppRoutingModule, ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
