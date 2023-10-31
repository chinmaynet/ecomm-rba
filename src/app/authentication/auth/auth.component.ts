
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from 'src/app/seller/seller-services/seller.service';
import { Router } from '@angular/router';
import { Login, SignUp } from '../../data-type';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  sellerSignUp: FormGroup;
  sellerLogin: FormGroup;
  showLogIn = true;

  module: string = '';

  constructor( private snackBar: MatSnackBar,private router: Router, private route: ActivatedRoute,private sellerService: SellerService, private formBuilder: FormBuilder) {    
    this.sellerSignUp = this.formBuilder.group({
      
      name: ['', [Validators.required]],
      userPhone: ['', [Validators.required, Validators.max(9999999999),Validators.min(1000000000)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.sellerLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {    
    this.route.queryParams.subscribe(params => {
      this.module = params['module'] || 'user';
    });

    this.sellerService.reloadSeller();
  }

  Signup(data: SignUp): void {
    let role: string = 'user';    
    const signupData: SignUp = {
      id: '', 
      name: data.name,
      email: data.email,
      userPhone: data.userPhone,
      password: data.password,
      role:''
    };
    
    switch (this.module) {
      case 'admin':
        role = 'admin';
        break;
      case 'seller':
        role = 'seller';
        break;
    }

    signupData.role= role;
    this.sellerService.userSignup(signupData);
  }

  
  Login(data: Login): void {
    let role: string = 'user';    
    // switch (this.module) {
    //   case 'admin':
    //     role = 'admin';
    //     break;
    //   case 'seller':
    //     role = 'seller';
    //     break;
    // }
    // data.role = role;
    this.sellerService.userLogin(data);
    this.sellerService.islogInError.subscribe((isError)=> {
      if(isError){
        this.showLoginErrorSnackbar('User Email or Password is Incorrect');
      }
    });
  }

  showLoginErrorSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
  get name() {
    return this.sellerSignUp.get('name');
  }

  get userPhone() {
    return this.sellerSignUp.get('userPhone');
  }

  get email() {
    return this.sellerSignUp.get('email');
  }

  get password() {
    return this.sellerSignUp.get('password');
  }

  get emailLogin() {
    return this.sellerLogin.get('email');
  }

  get passwordLogin() {
    return this.sellerLogin.get('password');
  }

  openLogIn() {
    this.showLogIn = !this.showLogIn;
  }

  openSignUp() {
    this.showLogIn = !this.showLogIn;
  }
} 