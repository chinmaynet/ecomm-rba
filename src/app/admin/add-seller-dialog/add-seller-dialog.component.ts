import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SignUp,UserWithRoles } from '../../data-type';
import { AdminService } from '../admin-services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
@Component({
  selector: 'app-add-seller-dialog',
  templateUrl: './add-seller-dialog.component.html',
  styleUrls: ['./add-seller-dialog.component.css']
})
export class AddSellerDialogComponent {
  adminAddSeller: FormGroup;
  dataSource: MatTableDataSource<UserWithRoles> = new MatTableDataSource<UserWithRoles>([]);
  displayedColumns: string[] = ['UserName', 'UserEmail', 'UserPhone'];
  constructor(private snackBar: MatSnackBar, private router: Router, private adminService: AdminService, private formBuilder: FormBuilder) {
    this.adminAddSeller = this.formBuilder.group({
      UserName: ['', [Validators.required]],
      UserEmail:  ['',[Validators.required, Validators.email]],
      UserPhone:  [ null, [Validators.required,Validators.max(9999999999),Validators.min(1000000000)]],
    });
  }
  saveResponce:UserWithRoles |null=null;
  addSeller(data: UserWithRoles) {
    const sendData : UserWithRoles = {
      Id:'00000000-0000-0000-0000-000000000000',
      UserName: data.UserName,
      UserEmail : data.UserEmail,
      UserPhone : data.UserPhone,
      UserPassword : '',
      role: 'seller',
      activityStatus:'',
    }
    data= sendData;
    console.log(data);
    this.adminService.addSeller(data).subscribe((newSeller: UserWithRoles) => {
      console.log('Response from addSeller:', newSeller);
      if (newSeller) {
        this.showLoginErrorSnackbar('Seller Added Successfully');
        this.saveResponce = newSeller;
        this.dataSource.data = [data];
        console.warn("user new seller is ",this.saveResponce)
        this.adminAddSeller.reset();
        // this.showPasswordDialog(newSeller);
      }
    });
  }
  get name() {
    return this.adminAddSeller.get('UserName');
  }
  get email() {
    return this.adminAddSeller.get('UserEmail');
  }
  get userPhone() {
    return this.adminAddSeller.get('UserPhone');
  }
  showLoginErrorSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
  addAnotherSeller(){
    this.saveResponce = null;
  }
  sendEmailToSeller(seller: UserWithRoles) {   
  }
}
