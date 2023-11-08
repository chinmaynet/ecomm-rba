import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../home-services/product.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PriceSummery } from '../data-type';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  priceSummery: PriceSummery = {
    price: 0,
    discount: 0,
    tax: 0,
    deliveryCharge: 0,
    total: 0,

  }

  cartProducts: Product[] | null = null;

  constructor(private product: ProductService, private router: Router, private products: ProductService) { }
  data = localStorage.getItem('localCart');
  user = localStorage.getItem('user');
  userId = this.user && JSON.parse(this.user).id;
  ngOnInit(): void {

    this.product.getCartList2(this.userId).subscribe((cartItems: Product[]) => {
      if (cartItems) {
        console.log("cartItems", cartItems);
        this.cartProducts = cartItems;
        console.log("cartDatafrom cartt is ", this.cartProducts);

        let totalPrice=0;
        
        cartItems.forEach((item)=>{
          if(item.quantity){
         
            totalPrice =totalPrice +( item.price * item.quantity)
          }          
        })
        // console.warn("totalPrice ",totalPrice)
        this.priceSummery.price=totalPrice;
        this.priceSummery.discount=totalPrice/10;
        this.priceSummery.tax=totalPrice/10;
        this.priceSummery.deliveryCharge = 100;
        this.priceSummery.total= totalPrice -(totalPrice/10)+(totalPrice/10)+100;

        console.log("priceSummery",this.priceSummery)

        if(!this.cartProducts.length){
          this.router.navigate(['/'])
        }
      }
    });

    
  }

  carouselConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      }
    ]
    // autoplay: true,
    // autoplaySpeed: 10000,
    // infinite: true,
  };

  removeTocart(product:Product){
    console.log("product data is ",product)
    this.cartProducts && this.products.removeFromCartBE(product.id, this.userId, product.color).subscribe(() => { })
    this.products.getCartList(this.userId).subscribe((cartItems: any) => {
      this.products.cartData.emit(cartItems);
      this.ngOnInit();
    });
  }
}
