import { Component, OnInit,ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../home-services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('slickModal') slickModal!: HomeComponent;
  popularProducts = new MatTableDataSource<Product>([]);
  // trendyProducts : undefined | Product[];
  trendyProducts:Product[]|null=[];
  selectedIndex: number = 0;

  displayedColumns: string[] = ['productName', 'productPrice', 'productDescription', 'productImage'];
 
  constructor(private product:ProductService){}
  ngOnInit(): void {
    // this.product.popularProduct2().subscribe((data)=>{

    //   this.popularProducts.data=data;
    // }); 
    this.product.trendyProducts2().subscribe((data)=>{
      this.trendyProducts=data;
    });
  }
  sliderPaused = true;
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
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },]        
  };
  sliderPause(pause: boolean): void {
    this.sliderPaused = pause;

    if (pause) {
      this.carouselConfig.autoplay = false; 
    } else {
      this.carouselConfig.autoplay = true;
    }
  }
  
  // slides = [
  //     { img: 'https://via.placeholder.com/600.png/09f/fff' },
  //     { img: 'https://via.placeholder.com/600.png/021/fff' },
  //     { img: 'https://via.placeholder.com/600.png/321/fff' },
  //     { img: 'https://via.placeholder.com/600.png/422/fff' },
  //     { img: 'https://via.placeholder.com/600.png/654/fff' },
  //   ];
  //   slideConfig = { slidesToShow: 4, slidesToScroll: 1 };
  // addSlide() {
  //     // this.slides.push({ img: 'http://placehold.it/350x150/777777' });
  //   }
  //   removeSlide() {
  //     // this.slides.length = this.slides.length - 1;
  //   }
  //   slickInit(e: any) {
  //     console.log('slick initialized');
  //   }
  //   breakpoint(e: any) {
  //     console.log('breakpoint');
  //   }
  //   afterChange(e: any) {
  //     console.log('afterChange');
  //   }
  //   beforeChange(e: any) {
  //     console.log('beforeChange');
  //   }
  // getFullImagePath(relativePath: string): string {
  //   const baseUrl = 'https://localhost:44376/';  
  //   return baseUrl + relativePath;
  // }
  
}
