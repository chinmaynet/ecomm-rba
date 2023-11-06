import { Component, OnInit } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductService } from '../home-services/product.service';
import { Product, UserWithRoles } from '../data-type';
import Chart from 'chart.js/auto';
import { ChartType, ChartOptions } from 'chart.js';
import { SellerService } from '../seller/seller-services/seller.service';
import { AnimationDurations } from '@angular/material/core';
import { AdminService } from '../admin/admin-services/admin.service';
// https://www.freecodecamp.org/news/how-to-make-pie-and-doughnut-charts-using-chartjs-in-angular/
@Component({
  // selector: 'app-test',
  // imports:[SlickCarouselModule],
  templateUrl: './test.component.html',
  // styleUrls: ['./test.component.css']

})

export class TestComponent implements OnInit {

  userData: UserWithRoles[] | null = [];
  constructor(private product: ProductService, private users: AdminService) { }
  public chart: any;
  popularProducts: Product[] | null = [];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  createChart(data: number[]) {

    this.chart = new Chart("MyChart", {
      type: 'pie',

      data: {
        labels: ['Admin', 'Seller', 'User',],
        datasets: [{
          label: 'My First Dataset',
          data: data,
          backgroundColor: [
            'red',
            'pink',
            'green',
          ],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

  ngOnInit(): void {

    this.users.usersWithRoles().subscribe((result) => {
      this.userData = result;
      console.log("pie data", this.userData);
      const roleCounts: { [key: string]: number } = {
        admin: 0,
        seller: 0,
        user: 0,
      };

      if (this.userData) {
        this.userData.forEach((user) => {
          console.log("Role:", user.role);
          if (user.role === 'admin') {
            roleCounts['admin']++;
          } else if (user.role === 'seller') {
            roleCounts['seller']++;
          } else if (user.role === 'user') {
            roleCounts['user']++;
          }
        });

        const data = Object.values(roleCounts);
        // console.log("pie dataa is ", data)
        this.createChart(data);
      }
    });
  }
}