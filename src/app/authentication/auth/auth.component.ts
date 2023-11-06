
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from 'src/app/seller/seller-services/seller.service';
import { Router } from '@angular/router';
import { Cart, Login, Product, SignUp } from '../../data-type';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/home-services/product.service';
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
  constructor(private product: ProductService, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, private sellerService: SellerService, private formBuilder: FormBuilder) {
    this.sellerSignUp = this.formBuilder.group({

      name: ['', [Validators.required]],
      userPhone: ['', [Validators.required, Validators.max(9999999999), Validators.min(1000000000)]],
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
      role: ''
    };
    switch (this.module) {
      case 'admin':
        role = 'admin';
        break;
      case 'seller':
        role = 'seller';
        break;
    }
    signupData.role = role;
    this.sellerService.userSignup(signupData).subscribe((result: any) => {
      if (result) {
        this.sellerService.isSellerLogin.next(true);
        this.sellerService.currentUser = result.role;
        console.warn("signup role is ", this.sellerService.currentUser);
        localStorage.setItem('user', JSON.stringify(result))
        this.router.navigate([`${this.sellerService.currentUser}/${this.sellerService.currentUser}-home`]);
        this.localCartToRemoteCart();
      }
      else {
        this.showLoginErrorSnackbar('User Email or Password is Incorrect');
      }
    });
    this.sellerService.islogInError.subscribe((isError) => {
      if (isError) {
        this.showLoginErrorSnackbar('User Email or Password is Incorrect');
      }
    });

  }
  Login(data: Login): void {
    let role: string = 'user';

    this.sellerService.userLogin(data).subscribe(
      // (result: any) => {
      //   if (result && result.body.role && result.status === 200) {
      //     this.sellerService.isSellerLogin.next(true);
      //     this.sellerService.currentUser = result.body.role;
      //     console.log("current user is ", this.sellerService.currentUser);
      //     localStorage.setItem('user', JSON.stringify(result.body));
      //     this.router.navigate([`${this.sellerService.currentUser}/${this.sellerService.currentUser}-home`]);
      //     this.showLoginErrorSnackbar('Login successful');
      //     this.localCartToRemoteCart();
      //   } else {
      //     this.showLoginErrorSnackbar('User Email or Password is Incorrect');
      //   }
      // },
      (result: any) => {
        if (result && result.status === 200) {
          if (result.body.role) {
            this.sellerService.isSellerLogin.next(true);
            this.sellerService.currentUser = result.body.role;
            console.log("current user is ", this.sellerService.currentUser);
            localStorage.setItem('user', JSON.stringify(result.body));
            this.router.navigate([`${this.sellerService.currentUser}/${this.sellerService.currentUser}-home`]);
            this.showLoginErrorSnackbar('Login successful');
            this.localCartToRemoteCart();
          }
          else {
            this.showLoginErrorSnackbar('User account is inactive. Access denied.');
          }
        }
        else if (result.status === 500) {
          this.showLoginErrorSnackbar('User account is inactive. Access denied.');
        } else {
          this.showLoginErrorSnackbar('User Email or Password is Incorrect');
        }
      }
      ,
      (error: any) => {
        if (error.status === 500) {
          this.showLoginErrorSnackbar('User account is inactive. Access denied.');
        } else {
          this.showLoginErrorSnackbar('User Email or Password is Incorrect');
        }      
      }
    );
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


  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (data) {
      let cartDataList: Product[] = JSON.parse(data);
      if (user) {
        userId = JSON.parse(user).id;
      }
      cartDataList.forEach((product: Product, index) => {
        let cartData: Cart = {
          ...product,
          userId,
          productId: product.id,
        };
        delete cartData.id;
        console.warn("cart data is ", cartData);
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            console.warn("item stored to BE");
          }
          localStorage.removeItem('localCart');
        })
      });
    }
    this.product.getCartList(userId).subscribe((cartItems: any) => {
      if (cartItems) {
        console.log(cartItems);
        this.product.cartData.emit(cartItems);
      }
    });
  }
} 