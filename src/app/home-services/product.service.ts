import { Injectable ,EventEmitter} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, Product, SignUp } from '../data-type';
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
  url:string = 'https://localhost:44376/api/E_Comm/products';
  constructor(private snackBar: MatSnackBar, private router: Router, private http: HttpClient) { }
  addProduct(product: any) : Observable<Product>{
    // product.productImages=null;
    // product.id="00000000-0000-0000-0000-000000000000";
    product.ProductImages={
      id:'',
      imagePath:'',
      productId:''
    }
      return this.http.post<Product>(this.url, product);
  }

  productList(){
    return this.http.get<Product[]>(this.url);
  }

  deleteProduct(id:string){
    return this.http.delete<Product>(`https://localhost:44376/api/E_Comm/product/${id}`);
  }

  updateProduct(product:any){
    console.log("product put is ",product)
    return this.http.put<Product>(`https://localhost:44376/api/E_Comm/products`, product);
  }

  popularProduct(){
    return this.http.get<Product[]>(`${this.url}?_limit=3`);
  }

  trendyProducts(){
    return this.http.get<Product[]>(`${this.url}?_limit=8`);
  }

  searchProducts(query: string){
    return this.http.get<Product[]>(`https://localhost:44376/api/E_Comm/productsQuery?q=${query}`);
  }
}