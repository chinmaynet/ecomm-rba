import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/data-type';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void { }
  displayedColumns: string[] = ['orderNumber', 'customerName', 'status'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();

  // orderData: Product[] = [];

} 
