import { Component,OnInit, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/home-services/product.service';
import { LogoutDialogComponent } from 'src/app/logout-dialog/logout-dialog.component';
@Component({
  selector: 'app-user-profile-component',
  templateUrl: './user-profile-component.component.html',
  styleUrls: ['./user-profile-component.component.css']
})
export class UserProfileComponentComponent implements OnInit {
  userData:any;
  constructor( @Inject(MAT_DIALOG_DATA) public data: string, private product: ProductService, public dialog: MatDialog, private route: Router) { 
    
  }
  
  ngOnInit(): void {
    let userStore = localStorage.getItem('user');
    let userDataa = userStore && JSON.parse(userStore);
    this.userData=userDataa;
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['data']) {
  //     this.userData = changes['data'].currentValue;
  //   }
  // }
  openLogoutDialog(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logOut();
        this.dialog.closeAll();
        
      }
    });
  }
  logOut() {
    localStorage.removeItem('user');
    this.route.navigate(['/']);
    this.product.cartData.emit([]);
    this.userData=null;
  }
}
