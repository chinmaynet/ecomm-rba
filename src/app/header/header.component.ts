import { Component, ElementRef, ViewChild ,HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OnInit } from '@angular/core';
import { ProductService } from '../home-services/product.service';
import { Product } from '../data-type';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { SellerService } from '../seller/seller-services/seller.service';
import { first, take } from 'rxjs/operators';
import { filter } from 'rxjs';
import { UserProfileComponentComponent } from '../user/user-profile-component/user-profile-component.component';
import { NgZone } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  isSearchVisible = false;
  searchInputValue = '';
  menuType: string = "default";
  cartItems = 0;
  urlValDefault: boolean = false;
  constructor(public dialog: MatDialog, private route: Router, private product: ProductService, private user: SellerService, private zone: NgZone, private cdr: ChangeDetectorRef) { }
  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  sideNavRefresh() {
    this.route.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
      ).subscribe((val: NavigationEnd) => {
        this.zone.run(() => {
          if (val.url) {
            this.urlValDefault = true;
            // console.log("url is ",val.url)
            if (localStorage.getItem('user') && val.url.includes('seller')) {
              this.urlValDefault = false;
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
              this.urlValDefault = false;
              this.menuType = "admin";
              if (localStorage.getItem('user')) {
                let userStore = localStorage.getItem('user');
                let userData = userStore && JSON.parse(userStore);
                this.userName = userData.userName;
              }
            }
            // else if (localStorage.getItem('user') && val.url.includes('user') && this.userRole === 'user') {
            else if (localStorage.getItem('user') && val.url.includes('user')) {
              this.urlValDefault = false;
              this.menuType = "user";
              if (localStorage.getItem('user')) {
                let userStore = localStorage.getItem('user');
                let userData = userStore && JSON.parse(userStore);
                this.userName = userData.userName;
                this.product.getCartList(userData.id).pipe().subscribe((cartItems: any) => {
                  this.product.cartData.emit(cartItems);
                  return;
                });
                // this.product.cartData.subscribe();
              }
            }
            else {
              this.cdr.detectChanges();
              this.urlValDefault = true;
              this.menuType = "default";
              if (localStorage.getItem('user')) {
                let userStore = localStorage.getItem('user');
                let userData = userStore && JSON.parse(userStore);
                this.product.getCartList(userData.id).pipe(take(1)).subscribe((cartItems: any) => {
                  this.product.cartData.emit(cartItems);

                });
              }
            }
          }
        });
      });
  }
  userStore = localStorage.getItem('user');
  userData = this.userStore && JSON.parse(this.userStore);


  searchProducts: undefined | Product[];
  userName: string = '';
  isDrawerOpen = false;
  @ViewChild('drawer') drawr: any;
  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
    this.drawr.toggle();
  }
  openProfileDialog() {
    const dialogRef = this.dialog.open(UserProfileComponentComponent, {
      width: '370px',
      // height:'450px',
      // data:this.userData, 
      position: {
        top: '50px',
        // left: '10px',
        right: '55px'
      },
    });
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
      this.userRole = currentUser?.role;

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
    this.sideNavRefresh();

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
  redirectToDetails(id: string) {
    this.searchInput.nativeElement.value = '';
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
    this.searchProducts = [];
  }
  serchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchProducts = result;
      })
    }
  }
  submitSearch(val: string) {
    this.route.navigate([`/search/${val}`]);
    this.hideList();
    this.searchInput.nativeElement.value = '';
  }
  redirectToCart() {
    if (localStorage.getItem('user')) {
      if (this.cartItems > 0) {
        this.route.navigate(["/cart-page"]);
      }
      else {
        this.route.navigate([null]);
      }
    }
    else {
      this.route.navigate(["user-auth/auth"])
    }
  }
  getByCatagory(catagory: string) {
    this.route.navigate([`/catagory/${catagory}`]);
  }
}
