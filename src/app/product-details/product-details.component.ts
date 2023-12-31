import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../home-services/product.service';
import { Product } from '../data-type';
import { Cart } from '../data-type';

import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private activateRoute: ActivatedRoute, private products: ProductService) { }
  removeCart = false;
  detailProduct: Product | null = null;
  CartData: Product | undefined;
  breakpoint!: number;
  helfBrakpoint!: number;
  ngOnInit(): void {
    //sets quantity of already carted product
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    this.products.getCartList(userId).subscribe((cartData: Cart[]) => {
      if (cartData) {
        let cartItem = cartData.find((item: Cart) => this.detailProduct?.id === item.productId);
        if (cartItem) {
          this.productQuantity = cartItem.quantity || 1;
        }
      }
    });

    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    productId && this.products.getProduct2(productId).subscribe((result) => {
      this.detailProduct = result;
      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: Product) => productId === item.id)
        if (items.length) {
          this.removeCart = true;
        }
        else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.products.getCartList(userId).subscribe((cartItems: any) => {
          this.products.cartData.emit(cartItems);
        });
        this.products.cartData.subscribe((result) => {

          let item = result.filter((item: Product) => productId === item.productId)

          if (item.length) {
            this.CartData = item[0];
            this.removeCart = true;
          }
        })
      }
    });
    this.activateRoute.paramMap.subscribe((params) => {
      const productId = params.get('productId');
      if (productId) {
        this.products.getProduct2(productId).subscribe((result) => {
          this.detailProduct = result;
        });
      }
    });
    this.setGridColumns(window.innerWidth);
  }
  onResize(event: any) {

    this.setGridColumns(event.target.innerWidth);
  }
  setGridColumns(windowWidth: number) {
    if (windowWidth <= 576) {
      this.breakpoint = 1;
      this.helfBrakpoint = 1;
    } else if (windowWidth <= 1200) {
      this.breakpoint = 4;
      this.helfBrakpoint = 4;
    } else {
      this.breakpoint = 6;
      this.helfBrakpoint = 3;
    }
  }

  // ngOnChanges() {
  //   this.ngOnInit();
  // }
  AddToCart() {
    if (this.detailProduct) {

      this.detailProduct.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.products.localAddToCart(this.detailProduct);
        this.removeCart = true;
      } else {

        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;

        let cartData: Cart = {
          ...this.detailProduct,
          userId,
          productId: this.detailProduct.id,
        }
        delete cartData.id;
        console.warn(cartData);

        this.products.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.products.getCartList(userId).subscribe((cartItems: any) => {
              this.products.cartData.emit(cartItems);
            });
            this.removeCart = true;
            // alert("product added in cart");
          }
        });

      }
    }
  }
  RemoveFromCart(productId: string) {
    if (!localStorage.getItem('user')) {
      this.products.removeItemFromCart(productId);
      this.removeCart = false;
    }
    else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      //productId

      this.CartData && this.products.removeFromCartBE(productId, userId, this.CartData.color).subscribe(() => { })
      this.products.getCartList(userId).subscribe((cartItems: any) => {
        this.products.cartData.emit(cartItems);
        this.ngOnInit()
        this.removeCart = false;
      });
      this.removeCart = false;
    }
  }
  carouselConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 10000,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },]
  };


  productQuantity: number = 1;
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val == 'plus') {
      this.productQuantity += 1;
    }
    else if (this.productQuantity > 1 && val == 'min') {
      this.productQuantity -= 1;
    }

    if(this.removeCart==true){
      this.AddToCart();
    }
    
  }
}
