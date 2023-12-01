import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../home-services/product.service';
import { Product } from '../data-type';
import { SellerService } from '../seller/seller-services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  imagePaths: string[] = ['banner-1.jpg', 'banner-2.jpg'];
  breakpoint!: number;
  breakpoint2!: number;
  halfBreakpoint!: number;
  rowHeight2: number = 650;
  rowHeight3: number = 315;

  breakpoint4!:number;
  rowHeight4: number = 300;

  @ViewChild('slickModal') slickModal!: HomeComponent;
  popularProducts = new MatTableDataSource<Product>([]);
  // trendyProducts : undefined | Product[];
  trendyProducts: Product[] | null = [];
  selectedIndex: number = 0;

  displayedColumns: string[] = ['productName', 'productPrice', 'productDescription', 'productImage'];
  getImagePath(image: string): string {
    return `/assets/${image}`;
    debugger;
  }


  constructor(  private route: Router , private product: ProductService, private user: SellerService) { }
  ngOnInit(): void {
    // this.product.popularProduct2().subscribe((data)=>{

    //   this.popularProducts.data=data;
    // }); 

    this.product.trendyProducts2().subscribe((data) => {
      this.trendyProducts = data;
    });


    console.log("check");
    this.setGridColumns(window.innerWidth);
    console.log("width is ", window.innerWidth)
    this.user.sendRole2();
  }
  
  onResize(event: any) {

    this.setGridColumns(event.target.innerWidth);
  }
  setGridColumns(windowWidth: number) {
    console.log("setGridColumns ", windowWidth)
    if (windowWidth <= 576) {
      this.breakpoint = 1;
      this.breakpoint2 = 1;
      this.breakpoint4=1;
      this.rowHeight2 = Math.max(400, 650 / this.breakpoint2);
      this.rowHeight3 = Math.max(400, 315 / this.breakpoint2);
      this.rowHeight4 = Math.min(180, 300 / this.breakpoint4);
    } else if (windowWidth <= 768) {
      this.breakpoint = 2;
      this.rowHeight2 = 650;
      this.rowHeight3 = 315;
    } else if (windowWidth <= 992) {
      this.breakpoint = 3;
      this.rowHeight2 = 650;
      this.rowHeight3 = 315;
    } else if (windowWidth <= 1200) {
      this.breakpoint = 4;
      this.rowHeight2 = 650;
      this.rowHeight3 = 315;
    } else {
      this.breakpoint = 4;
      this.breakpoint2 = 4;
      this.breakpoint4=3;
      this.rowHeight2 = 650;
      this.rowHeight3 = 315;
      this.rowHeight4=300;
    }
    this.halfBreakpoint = this.breakpoint2 / 2;
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },]
  };

  carouselConfigBanner = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
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
  sliderPause(pause: boolean): void {
    this.sliderPaused = pause;

    if (pause) {
      this.carouselConfig.autoplay = false;
    } else {
      this.carouselConfig.autoplay = true;
    }
  }
  getByCatagory(catagory: string) {
    // this.product.searchProducts(catagory).subscribe((result)=>{
    // if(result){
    // console.log("Get by catagory is",result);
    this.route.navigate([`/catagory/${catagory}`]);
    // }
    // });
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
