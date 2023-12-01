import { Component, OnInit,ViewChild } from '@angular/core';
import { ProductService } from '../home-services/product.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from '../data-type';

@Component({
  selector: 'app-catagory',
  templateUrl: './catagory.component.html',
  styleUrls: ['./catagory.component.css']
})
export class CatagoryComponent implements OnInit {
  trendyProducts: Product[] | null = [];
  breakpoint!: number;
  // @ViewChild('slickModal') slickModal!: CatagoryComponent;
  catagory: string | null = '';
  constructor(private route: Router, private routeData: ActivatedRoute, private products: ProductService) {
    this.catagory = routeData.snapshot.paramMap.get('catagory');
    console.log(this.catagory);
  }
  ngOnInit(): void {
    this.routeData.paramMap.subscribe(params => {
      this.catagory = params.get('catagory');
      console.log(this.catagory);

      this.products.searchProducts2(this.catagory!).subscribe(result => {
        if (result) {
          this.trendyProducts = result;
          console.log("Get by catagory is", result);
        }
      });
    });
    this.setGridColumns(window.innerWidth);
    
  }
  onResize(event: any) {

    this.setGridColumns(event.target.innerWidth);
  }
  setGridColumns(windowWidth: number) {
    console.log("setGridColumns ",windowWidth )
    if (windowWidth <= 576) {
      this.breakpoint = 1;
    } else if (windowWidth <= 768) {
      this.breakpoint = 2;
    } else if (windowWidth <= 992) {
      this.breakpoint = 3;
    } else if (windowWidth <= 1200) {
      this.breakpoint = 4;
    } else {
      this.breakpoint = 4;
    }
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
  sliderPause(pause: boolean): void {
    this.sliderPaused = pause;

    if (pause) {
      this.carouselConfig.autoplay = false;
    } else {
      this.carouselConfig.autoplay = true;
    }
  }
}
