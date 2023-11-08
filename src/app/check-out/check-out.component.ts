import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../home-services/product.service';
import { Product, Order, Cart } from '../data-type';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  checkOutForm: FormGroup;
  totalPrice: number | undefined;

  cartData:Product[]|undefined;
  constructor(private formBuilder: FormBuilder,private snackBar: MatSnackBar, private product: ProductService, private router :Router) {
    this.checkOutForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.max(9999999999), Validators.min(1000000000)]],
      address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(60)]],

    });
  }
  data = localStorage.getItem('localCart');
  user = localStorage.getItem('user');
  userId = this.user && JSON.parse(this.user).id;
  ngOnInit(): void {
    this.product.getCartList2(this.userId).subscribe((cartItems: Product[]) => {
      if (cartItems) {
        let totalPrice = 0;
        this.cartData=cartItems;
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


  showLoginErrorSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
  orderNow(data: { name: string, email: string, address: string, contact: string }) {
    console.log("data is ", data)

    let user = localStorage.getItem('user');
    let userId = this.user && JSON.parse(this.user).id;

    if (this.totalPrice) {
      let orderData: Order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id:undefined
      }
      this.cartData?.forEach((item) => {
        this.product.deleteCartItems(userId);
      })
      this.product.orderNow(orderData).subscribe((result)=>{
        console.log("oreder now ",result);
        if(result){
          let user = localStorage.getItem('user');
          let userRole = this.user && JSON.parse(this.user).role;
          this.showLoginErrorSnackbar('Order Placed!');

          if(userRole ==="user"){
            this.router.navigate(['/user/user-home']);
          }
          else{
            this.router.navigate(['/my-orders']);          
          }
          // setTimeout(() => {            
            
          // }, 3000);
        }
      })
    }    
  }
}
