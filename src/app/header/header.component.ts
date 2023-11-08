import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ProductService } from '../home-services/product.service';
import { Product } from '../data-type';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { SellerService } from '../seller/seller-services/seller.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType: string = "default";
  cartItems = 0;
  constructor(public dialog: MatDialog, private route: Router, private product: ProductService, private user: SellerService) { }

  searchProducts: undefined | Product[];
  userName: string = '';
  isDrawerOpen = false;
  @ViewChild('drawer') drawr: any;
  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
    this.drawr.toggle();
  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '300px',

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logOut();
      }
    });
  }
  userRole: String | null = null;

  sellerOrAdmin: boolean | undefined = false;

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const currentUser = JSON.parse(userString);
      this.userRole = currentUser.role;

      // this.user.sendRole();

      // this.user.userRole.subscribe((role) => {
      //   if (this.userRole === 'seller' || this.userRole === 'admin') {
      //     this.sellerOrAdmin = true;
      //   }
      //   else{
      //     this.sellerOrAdmin = false;
      //   }
      // });
    }

    // this.user.sendRole2();
    this.user.userRole$.subscribe((role) => {
     
      if (role === 'seller' || role === 'admin') {
        this.sellerOrAdmin = true;
      } else {
        this.sellerOrAdmin = false;
      }
    });
  
    this.route.events.subscribe((val: any) => {
    if (val.url) {
      if (localStorage.getItem('user') && val.url.includes('seller')) {
        // if (localStorage.getItem('user') && val.url.includes('seller') && this.userRole === 'seller') {
        this.menuType = "seller";
        if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.userName;
        }
      }
      // else if (localStorage.getItem('user') && val.url.includes('admin') && this.userRole === 'admin') {
      else if (localStorage.getItem('user') && val.url.includes('admin')) {
        this.menuType = "admin";
        if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.userName;
        }
      }
      // else if (localStorage.getItem('user') && val.url.includes('user') && this.userRole === 'user') {
      else if (localStorage.getItem('user') && val.url.includes('user')) {
        this.menuType = "user";
        if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.userName;
          this.product.getCartList(userData.id).subscribe((cartItems: any) => {
            this.product.cartData.emit(cartItems);
          });
          // this.product.cartData.subscribe();
        }
      }
      else {
        this.menuType = "default";
        if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.product.getCartList(userData.id).subscribe((cartItems: any) => {
            this.product.cartData.emit(cartItems);
          });
        }
      }
    }
  });
let cartData = localStorage.getItem('localCart');
if (cartData) {
  this.cartItems = JSON.parse(cartData).length
}
this.product.cartData.subscribe((items) => {
  this.cartItems = items.length;
})
  }
redirectToSellerAuth() {
  // this.route.navigate(['user-auth/auth'], { queryParams: { module: 'seller' } });
  if (localStorage.getItem('user')) {
    const userString = localStorage.getItem('user');
    if (userString) {
      const currentUser = JSON.parse(userString);
      const userRole = currentUser.role;

      if (userRole === 'admin' && this.menuType === 'default') {
        // Display the logout confirmation dialog
        const dialogRef = this.dialog.open(LogoutDialogComponent, {
          width: '300px',
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            localStorage.removeItem('user');
            this.route.navigate(['user-auth/auth'], {
              queryParams: { module: 'seller' },
            });
          }
        });
      } else {
        // Just navigate to the seller authentication page
        this.route.navigate(['user-auth/auth'], { queryParams: { module: 'seller' } });
      }
    }
  }
  else {
    this.route.navigate(['user-auth/auth'], { queryParams: { module: 'seller' } });
  }
}
redirectToAdminAuth() {
  // this.route.navigate(['user-auth/auth'], { queryParams: { module: 'admin' } });
  if (localStorage.getItem('user')) {
    const userString = localStorage.getItem('user');
    if (userString) {
      const currentUser = JSON.parse(userString);
      const userRole = currentUser.role;

      if (userRole === 'seller' && this.menuType === 'default') {
        const dialogRef = this.dialog.open(LogoutDialogComponent, {
          width: '300px',
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            localStorage.removeItem('user');
            this.route.navigate(['user-auth/auth'], {
              queryParams: { module: 'admin' },
            });
          }
        });
      } else {
        this.route.navigate(['user-auth/auth'], { queryParams: { module: 'admin' } });
      }
    }

  }
  else {
    this.route.navigate(['user-auth/auth'], { queryParams: { module: 'admin' } });
  }
}
redirectToDetails(id: string){
  this.route.navigate(['/details/' + id]);

}
logOut() {
  localStorage.removeItem('user');
  this.route.navigate(['/']);
  this.product.cartData.emit([]);
}
showResults: boolean = false;

showList() {
  this.showResults = true;
}

hideList() {
  this.showResults = false;
}
serchProduct(query: KeyboardEvent) {
  if (query) {
    const element = query.target as HTMLInputElement;
    // console.warn(element.value);
    this.product.searchProducts(element.value).subscribe((result) => {
      // console.warn(result);
      if (result.length > 5) {
        result.length = 5;
      }
      this.searchProducts = result;
    })
  }
}
submitSearch(val: string){
  // console.warn("data is ",val);
  this.route.navigate([`/search/${val}`]);
}
redirectToCart(){
  if (localStorage.getItem('user')) {
    
    if(this.cartItems>0){
      this.route.navigate(["/cart-page"]);
    }
    else{
      this.route.navigate([null]);
    }
  }
  else {
    this.route.navigate(["user-auth/auth"])
  }
}
}
