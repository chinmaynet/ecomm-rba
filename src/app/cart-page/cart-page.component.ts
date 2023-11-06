import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../home-services/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartProducts: Product[] | null = null;

  constructor(private product: ProductService) { }
  data = localStorage.getItem('localCart');
  user = localStorage.getItem('user');
  userId = this.user && JSON.parse(this.user).id;
  ngOnInit(): void {

    this.product.getCartList2(this.userId).subscribe((cartItems:  Product[]) => {
      if (cartItems) {
        console.log("cartItems", cartItems);
        this.cartProducts = cartItems;
        console.log("cartDatafrom cartt is ", this.cartProducts);
      }
    });
  }
  carouselConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    // autoplay: true,
    // autoplaySpeed: 10000,
    // infinite: true,
  };
}
