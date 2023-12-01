import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import { Order, Product } from 'src/app/data-type';
import { ProductService } from 'src/app/home-services/product.service';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  displayedColumns: string[] = ['orderNumber', 'price', 'status', 'action'];
  orderList: MatTableDataSource<Order> = new MatTableDataSource<Order>();

  @ViewChild(MatTable) table!: MatTable<Order>;

  constructor(private router: Router, private product: ProductService) { }
  ngOnInit(): void {
    this.getAllOrders();
    
   }
   
  cancelOrder(orderId:string){
     orderId && this.product.deleteOrder(orderId).subscribe((result)=>{
      this.getAllOrders();
    })
  }
  getAllOrders() {
    this.product.orderList().subscribe((result) => {
      this.orderList.data=result;
    })
  }
} 
