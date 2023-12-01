import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../home-services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  implements OnInit{
  searchProducts:Product[] | null = null;
  constructor(private product:ProductService, private activatedRoute:ActivatedRoute){}
  searchResult:Product[]|undefined=[];

  ngOnInit(): void {    
    this.activatedRoute.paramMap.subscribe((params) => {
      const query = params.get('query');
      query && this.product.searchProducts2(query).subscribe((result) => {
        this.searchProducts = result;
      });
    });
  }
  carouselConfig = {
    slidesToShow: 1,          
    slidesToScroll: 1,
    arrows: true,           
    dots: false,
    autoplay: true,         
    autoplaySpeed: 10000,    
    infinite: true,          
  };
}
