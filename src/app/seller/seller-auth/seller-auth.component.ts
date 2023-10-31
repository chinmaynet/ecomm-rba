import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../seller-services/seller.service';
import { Router } from '@angular/router';
import { SignUp } from '../../data-type';
console.log('auth component laded of seller module');
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  // sellerSignUp: FormGroup;
  // sellerLogin: FormGroup;
  // showLogIn = false;



  constructor( private snackBar: MatSnackBar,private router: Router, private sellerService: SellerService, private formBuilder: FormBuilder) {    
    // this.sellerSignUp = this.formBuilder.group({
      
    //   name: ['', [Validators.required]],
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]],
    // });

    // this.sellerLogin = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]],
    // });
  }

  ngOnInit(): void {

    // this.sellerService.reloadSeller();
  }

  // Signup(data: SignUp): void {
  //   const signupData: SignUp = {
  //     id: '', 
  //     name: data.name,
  //     email: data.email,
  //     password: data.password,
  //     role:''
  //   };

  //   this.sellerService.userSignup(signupData);
  // }


  // Login(data: SignUp): void {
  //   this.sellerService.userLogin(data);
  //   this.sellerService.islogInError.subscribe((isError)=> {
  //     if(isError){
       
  //       this.showLoginErrorSnackbar('User Email or Password is Incorrect');
  //     }
  //   });
  // }

  // showLoginErrorSnackbar(message: string) {
  //   this.snackBar.open(message, 'Close', {
  //     duration: 5000, 
  //   });
  // }
  // get name() {
  //   return this.sellerSignUp.get('name');
  // }

  // get email() {
  //   return this.sellerSignUp.get('email');
  // }

  // get password() {
  //   return this.sellerSignUp.get('password');
  // }

  // get emailLogin() {
  //   return this.sellerLogin.get('email');
  // }

  // get passwordLogin() {
  //   return this.sellerLogin.get('password');
  // }

  // openLogIn() {
  //   this.showLogIn = !this.showLogIn;
  // }

  // openSignUp() {
  //   this.showLogIn = !this.showLogIn;
  // }
} 
