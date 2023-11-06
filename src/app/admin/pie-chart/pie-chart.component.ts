import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartType, ChartOptions } from 'chart.js';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  @Output() roleSelected = new EventEmitter<string>();
  roleData: number[] = [];
  public chart: any;
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  constructor(private sharedService: SharedService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {

    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams['roleData']) {

        this.roleData = JSON.parse(queryParams['roleData']);
        console.log('Received roleData:', this.roleData);
      }
      this.createChart(this.roleData)
    });
  }

  onRoleSelected(role: string) {
    console.log("role is",role)
    this.sharedService.changeSelectedRole(role);
  }

  togglePieChart() {
    this.router.navigate(['admin/admin-home']);
  }
  createChart(data: number[]) {
    const canvas = document.getElementById('RoleChart') as HTMLCanvasElement;
    if (canvas) {
      this.chart = new Chart(canvas, {
        type: 'pie',
        data: {
          labels: ['Admin', 'Seller', 'User'],
          datasets: [{
            label: 'Quantity',
            data: data,
            backgroundColor: ['red', 'pink', 'green'],
            hoverOffset: 4
          }],
        },
        options: {
          aspectRatio: 2.5
        }
      });
    }
  }
}
