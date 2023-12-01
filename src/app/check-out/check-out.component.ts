import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../home-services/product.service';
import { Product, Order, Cart } from '../data-type';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { max } from 'rxjs';
import { ViewEncapsulation} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';


import * as _moment from 'moment';

import {default as _rollupMoment, Moment} from 'moment';
import {MatInputModule} from '@angular/material/input';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  checkOutForm: FormGroup;
  totalPrice: number | undefined;
  cartProducts: Product[] | null = null;
  cartData: Product[] | undefined;
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private product: ProductService, private router: Router) {
    this.checkOutForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.max(9999999999), Validators.min(1000000000)]],
      address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(60)]],
      address2: ['', [Validators.minLength(10), Validators.maxLength(60)]],
      country: ['', Validators.required],
      state: ['',],
      postalCode: ['', [Validators.required, Validators.min(100000), Validators.max(999999)]],

      // 
      paymentMethod: ['', Validators.required],

      //1 cod

      //2 credit card 
      nameOnCard: ['', Validators.required],
      creditCardNumber: ['', [Validators.required, Validators.max(9999999999999999), Validators.min(1000000000000000)]],
      expiration: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],

      //3 debit card
      nameOnDebitCard: ['', Validators.required],
      debitCardNumber: ['', [Validators.required, Validators.max(9999999999999999), Validators.min(1000000000000000)]],
      expirationDebit: ['', Validators.required],
      cvvDebit: ['', [Validators.required, Validators.max(999), Validators.min(1)]],

      //4 paypal
      payPalId: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(60)]],

      //5 upi

      upiId: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(20)]],
    });
  }
  date = new FormControl(moment());
  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  codSelected() {
    this.checkOutForm.removeControl('upiId');
    this.checkOutForm.removeControl('payPalId')
    this.checkOutForm.removeControl('cvvDebit')
    this.checkOutForm.removeControl('expirationDebit')
    this.checkOutForm.removeControl('debitCardNumber')
    this.checkOutForm.removeControl('nameOnDebitCard')
    this.checkOutForm.removeControl('cvv')
    this.checkOutForm.removeControl('expiration')
    this.checkOutForm.removeControl('creditCardNumber')
    this.checkOutForm.removeControl('nameOnCard')

  }
  creditCardSelected() {

    this.checkOutForm.removeControl('upiId');
    this.checkOutForm.removeControl('payPalId')
    this.checkOutForm.removeControl('cvvDebit')
    this.checkOutForm.removeControl('expirationDebit')
    this.checkOutForm.removeControl('debitCardNumber')
    this.checkOutForm.removeControl('nameOnDebitCard')

    // this.checkOutForm.addControl('cvv','expiration');
    // this.checkOutForm.addControl('nameOnCard','creditCardNumber');

    this.checkOutForm.addControl('expiration', new FormControl('', Validators.required));
    this.checkOutForm.addControl('cvv', new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]));
    this.checkOutForm.addControl('nameOnCard', new FormControl('', Validators.required));
    this.checkOutForm.addControl('creditCardNumber', new FormControl('', [Validators.required, Validators.max(9999999999999999), Validators.min(1000000000000000)]));
  }
  debitCardSelected() {
    this.checkOutForm.removeControl('upiId');
    this.checkOutForm.removeControl('payPalId')
    this.checkOutForm.removeControl('cvv')
    this.checkOutForm.removeControl('expiration')
    this.checkOutForm.removeControl('creditCardNumber')
    this.checkOutForm.removeControl('nameOnCard')

    this.checkOutForm.addControl('expirationDebit', new FormControl('', Validators.required));
    this.checkOutForm.addControl('cvvDebit', new FormControl('', [Validators.required, Validators.max(999), Validators.min(1)]));
    this.checkOutForm.addControl('nameOnDebitCard', new FormControl('', Validators.required));
    this.checkOutForm.addControl('debitCardNumber', new FormControl('', [Validators.required, Validators.max(9999999999999999), Validators.min(1000000000000000)]));

  }
  payPalSelected() {
    this.checkOutForm.removeControl('upiId');
    this.checkOutForm.removeControl('cvvDebit')
    this.checkOutForm.removeControl('expirationDebit')
    this.checkOutForm.removeControl('debitCardNumber')
    this.checkOutForm.removeControl('nameOnDebitCard')
    this.checkOutForm.removeControl('cvv')
    this.checkOutForm.removeControl('expiration')
    this.checkOutForm.removeControl('creditCardNumber')
    this.checkOutForm.removeControl('nameOnCard')

    this.checkOutForm.addControl('payPalId', new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(60)]));
  }
  upiSelected() {
    this.checkOutForm.removeControl('payPalId')
    this.checkOutForm.removeControl('cvvDebit')
    this.checkOutForm.removeControl('expirationDebit')
    this.checkOutForm.removeControl('debitCardNumber')
    this.checkOutForm.removeControl('nameOnDebitCard')
    this.checkOutForm.removeControl('cvv')
    this.checkOutForm.removeControl('expiration')
    this.checkOutForm.removeControl('creditCardNumber')
    this.checkOutForm.removeControl('nameOnCard')

    this.checkOutForm.addControl('upiId', new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(20)]));
  }
  data = localStorage.getItem('localCart');
  user = localStorage.getItem('user');
  userId = this.user && JSON.parse(this.user).id;
  ngOnInit(): void {

    this.product.getCartList2(this.userId).subscribe((cartItems: Product[]) => {
      if (cartItems) {
        this.cartProducts = cartItems;
        console.log("cart data in check out", this.cartProducts)
        let totalPrice = 0;
        this.cartData = cartItems;
        cartItems.forEach((item) => {
          if (item.quantity) {

            totalPrice = totalPrice + (item.price * item.quantity)
          }
        })
        this.totalPrice = totalPrice - (totalPrice / 10) + (totalPrice / 10) + 100;
      }
    });
  }
  get email() {
    return this.checkOutForm.get('email');
  }
  get name() {
    return this.checkOutForm.get('name');
  }
  get contact() {
    return this.checkOutForm.get('contact');
  }
  get address() {
    return this.checkOutForm.get('address');
  }
  get address2() {
    return this.checkOutForm.get('address2');
  }

  get country() {
    return this.checkOutForm.get('country');
  }
  get postalCode() {
    return this.checkOutForm.get('postalCode');
  }
  get nameOnCard() {
    return this.checkOutForm.get('nameOnCard');
  }
  get creditCardNumber() {
    return this.checkOutForm.get('creditCardNumber');
  }
  get expiration() {
    return this.checkOutForm.get('expiration');
  }
  get cvv() {
    return this.checkOutForm.get('cvv');
  }

  get payPalId() {
    return this.checkOutForm.get('payPalId');
  }

  get upiId() {
    return this.checkOutForm.get('upiId');
  }

  get nameOnDebitCard() {
    return this.checkOutForm.get('nameOnDebitCard');
  }
  get debitCardNumber() {
    return this.checkOutForm.get('debitCardNumber');
  }
  get expirationDebit() {
    return this.checkOutForm.get('expirationDebit');
  }
  get cvvDebit() {
    return this.checkOutForm.get('cvvDebit');
  }


  showLoginErrorSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
  orderNow(data: any) {
    debugger
    console.log("data is ", data)

    let user = localStorage.getItem('user');
    let userId = this.user && JSON.parse(this.user).id;

    if (this.totalPrice) {
      let orderData: Order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }
      this.cartData?.forEach((item) => {
        this.product.deleteCartItems(userId);
      })
      this.product.orderNow(orderData).subscribe((result) => {
        console.log("oreder now ", result);
        if (result) {
          let user = localStorage.getItem('user');
          let userRole = this.user && JSON.parse(this.user).role;
          this.showLoginErrorSnackbar('Order Placed!');

          if (userRole === "user") {
            this.router.navigate(['/user/user-home']);
          }
          else {
            this.router.navigate(['/my-orders']);
          }
          // setTimeout(() => {            

          // }, 3000);
        }
      })
    }
  }
}
