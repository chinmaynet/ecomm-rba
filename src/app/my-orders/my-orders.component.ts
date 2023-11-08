import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, Product } from '../data-type';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../home-services/product.service';
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  displayedColumns: string[] = ['orderNumber', 'price', 'status', 'action'];
  orderList: MatTableDataSource<Order> = new MatTableDataSource<Order>();
  
  constructor( private product : ProductService,private router: Router) { }

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
