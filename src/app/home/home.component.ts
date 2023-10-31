import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../home-services/product.service';
import { Product } from '../data-type';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  popularProducts = new MatTableDataSource<Product>([]);
  trendyProducts : undefined | Product[];
  selectedIndex: number = 0;

  displayedColumns: string[] = ['productName', 'productPrice', 'productDescription', 'productImage'];
 
  constructor(private product:ProductService){}
  ngOnInit(): void {
    this.product.popularProduct().subscribe((data)=>{

      this.popularProducts.data=data;
    }); 
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    });
  }
  carouselConfig = {
    slidesToShow: 3 ,          
    slidesToScroll: 1,
    arrows: true,           
    dots: true,
    autoplay: true,         
    autoplaySpeed: 2000,    
    infinite: true,          
  };
  getFullImagePath(relativePath: string): string {
    const baseUrl = 'https://localhost:44376/';  
    return baseUrl + relativePath;
  }
  
}
