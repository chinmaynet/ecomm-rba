import { Component } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../home-services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchProducts:Product[] | null = null;
  constructor(private product:ProductService){}
  ngOnInit(): void {
    // this.product.searchProducts().subscribe((data)=>{

    //   this.searchProducts=data;
    // });
  }
  getFullImagePath(relativePath: string): string {
    const baseUrl = 'https://localhost:44376/';
  
    return baseUrl + relativePath;
  }
}
