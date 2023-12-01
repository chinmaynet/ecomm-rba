import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cart, Login, Order, Product, SignUp } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //books strore api //csharp projects/booksstoreApi
  cartData = new EventEmitter<Product[] | []>();
  url: string = 'https://localhost:44376/api/E_Comm/products';
  constructor(private snackBar: MatSnackBar, private router: Router, private http: HttpClient) { }
  addProduct(product: any): Observable<Product> {
    // product.productImages=null;
    // product.id="00000000-0000-0000-0000-000000000000";
    product.ProductImages = {
      id: '',
      imagePath: '',
      productId: ''
    }
    return this.http.post<Product>(this.url, product);
  }

  productList() {
    return this.http.get<Product[]>(this.url).pipe(
      map((products: Product[]) => {
        return products.map((product: Product) => {

          const productImages = product.productImages.map((image: any) => {
            return this.getFullImagePath(image.imagePath);
          });

          return {
            ...product,
            productImages: productImages,
          };
        });
      })
    );
  }
  getProduct(id: string) {
    return this.http.get<Product>(`https://localhost:44376/api/E_Comm/product/${id}`)
  }
  getProduct2(id: string): Observable<Product> {
    return this.http.get<Product>(`https://localhost:44376/api/E_Comm/product/${id}`)
      .pipe(
        map((product: Product) => {
          const productImages = product.productImages.map((image: any) => {
            return {
              ...image,
              imagePath: this.getFullImagePath(image.imagePath),
            };
          });

          return {
            ...product,
            productImages: productImages,
          };
        })
      );
  }
  deleteProduct(id: string) {
    return this.http.delete<Product>(`https://localhost:44376/api/E_Comm/product/${id}`);
  }

  updateProduct(product: any) {
    console.log("product put is ", product)
    return this.http.put<Product>(`https://localhost:44376/api/E_Comm/products`, product);
  }

  popularProduct() {
    return this.http.get<Product[]>(`${this.url}?_limit=3`);
  }
  // popularProduct2() {
  //   return this.http.get<Product[]>(`${this.url}`).pipe(
  //     map((products: Product[]) => {
  //       return products.map((product: Product) => {

  //         const productImages = product.productImages.map((image: any) => {
  //           return this.getFullImagePath(image.imagePath);
  //         });

  //         return {
  //           ...product,
  //           productImages: productImages,
  //         };
  //       });
  //     })
  //   );
  // }
  trendyProducts2() {
    return this.http.get<Product[]>(`${this.url}`).pipe(
      map((products: Product[]) => {
        return products.map((product: Product) => {

          const productImages = product.productImages.map((image: any) => {
            return this.getFullImagePath(image.imagePath);
          });

          return {
            ...product,
            productImages: productImages,
          };
        })
        .slice(0, 4);
      })
    );
  }
  getFullImagePath(relativePath: string): string {
    const baseUrl = 'https://localhost:44376/';
    return baseUrl + relativePath;
  }
  // trendyProducts(){
  //   return this.http.get<Product[]>(`${this.url}?_limit=8`);
  // }

  searchProducts(query: string) {
    return this.http.get<Product[]>(`https://localhost:44376/api/E_Comm/productsQuery?q=${query}`);
  }
  searchProducts2(query: string) {
    return this.http.get<Product[]>(`https://localhost:44376/api/E_Comm/productsQuery?q=${query}`).pipe(
      map((products: Product[]) => {
        return products.map((product: Product) => {

          const productImages = product.productImages.map((image: any) => {
            return this.getFullImagePath(image.imagePath);
          });

          return {
            ...product,
            productImages: productImages,
          };
        });
      })
    );
  }

  localAddToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    }
    else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: string) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
      console.warn(items);
    }
  }

  addToCart(cartData: Cart) {
    return this.http.post('https://localhost:44376/api/E_Comm/cart', cartData);

  }

  // getCartList(userId: number) {
  // return this.http.get<Product[]>('https://localhost:44376/api/E_Comm/cart?userId=' + userId,{observe:'response'}).subscribe((result) => {
  //   console.warn("getCartlist",result);
  //   if (result && result.body) {
  //     this.cartData.emit(result.body);
  //   }
  // });    
  // }
  
  getCartList(userId: string): Observable<Cart[]> {
    const params = new HttpParams().set('userId', userId);
    //  console.log("cart List called");
    return this.http.get<Cart[]>(`https://localhost:44376/api/E_Comm/cart`, { params })
      // .subscribe((result)=>{
      //   if(result && result.body){
      //     this.cartData.emit(result.body);
      //   }
      // })
      ;
  }

  getCartList2(userId: string) {
    return this.http.get<Product[]>(`https://localhost:44376/api/E_Comm/cartt?userId=${userId}`).pipe(
      map((products: Product[]) => {
        return products.map((product: Product) => {

          // const productImages = product.productImages.map((image: any) => {
          //   return this.getFullImagePath(image.imagePath);
          // });
          const productImages = product.imagePaths.map((imagePath: string) => {
            return this.getFullImagePath(imagePath);
          }) ;

          return {
            ...product, //shallow copy 
            productImages: productImages,
          };
        });
      })
    );
  }

  // removeFromCartBE(cartId: string){
  //   return this.http.delete('https://localhost:44376/api/E_Comm/cart'+ cartId);
  // }
  removeFromCartBE(productId: any, userId: string, color: string) {
    return this.http.delete(`https://localhost:44376/api/E_Comm/cart?userId=${userId}&productId=${productId}&color=${color}`);
  }


  orderNow(data:Order){
    return this.http.post('https://localhost:44376/api/E_Comm/order',data);
  }

  orderList(){
    let userStrore = localStorage.getItem('user');
    let userData = userStrore && JSON.parse(userStrore);

    return this.http.get<Order[]>('https://localhost:44376/api/E_Comm/order?userId='+userData.id);
  }

  deleteCartItems(id :string){//order is places so delete cart Items
    return this.http.delete(`https://localhost:44376/api/E_Comm/cartt?userId=${id}`,{observe:'response'}).subscribe((result)=>{
      if(result){
        this.cartData.emit([]);
      }
    })
  }

  deleteOrder(orderId :string){
    return this.http.delete(`https://localhost:44376/api/E_Comm/order?orderId=${orderId}`);
  }
}