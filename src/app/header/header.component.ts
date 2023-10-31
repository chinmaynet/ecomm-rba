import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ProductService } from '../home-services/product.service';
import { Product } from '../data-type';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType: string = "default";
  constructor(public dialog: MatDialog, private route: Router, private product: ProductService) { }

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
  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const currentUser = JSON.parse(userString);
      this.userRole = currentUser.role;
    }
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
          }
        }
        else {
          this.menuType = "default";
        }
      }
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
  logOut() {
    localStorage.removeItem('user');
    this.route.navigate(['/'])
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
  submitSearch(val:string){
    console.warn("data is ",val);
    this.route.navigate([`/search/${val}`]);
  }
}
