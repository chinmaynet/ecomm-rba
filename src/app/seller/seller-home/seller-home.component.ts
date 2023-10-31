import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { ProductService } from 'src/app/home-services/product.service';
import { Product } from 'src/app/data-type';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})

export class SellerHomeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  editingProduct: Product | null = null;
  displayedColumns: string[] = ['name', 'price', 'color', 'catagory', 'description', 'productImages', 'action'];
  productList: MatTableDataSource<Product> = new MatTableDataSource<Product>();
 
  constructor(public dialog: MatDialog,private snackBar: MatSnackBar, private router: Router, private product: ProductService) { }

  getFullImagePath(relativePath: string): string {
    // Assuming that your images are served from the root URL of your backend
    const baseUrl = 'https://localhost:44376/';
  
    return baseUrl + relativePath;
  }
  
  openDeleteDialog(product:Product): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: product, 
    
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {       
        this.deleteProduct(product.id);
      }
    });
  }

  openEditProductDialog(product:Product):any{
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      width: '550px',
      height:'630px',
      data: product, 
      
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {       
        this.getAllProducts();
      }
    });
  }
  ngOnInit() {
    console.warn("seller-home-works");
    this.getAllProducts();
   
  }
  
  ngAfterViewInit(): void {
    this.productList.paginator = this.paginator;
    this.productList.sort = this.sort;
  }

  selectProduct(product: Product): void {
    this.editingProduct = product;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productList.filter = filterValue.trim().toLowerCase();

    if (this.productList.paginator) {
      this.productList.paginator.firstPage();
    }
  }
  navigateToAddProduct(){
    this.router.navigate(['seller/seller-add-product'])
  }
  save(product: Product): void {
    debugger;
    this.product.updateProduct(this.editingProduct!)
      .subscribe(() => {
        debugger;
        this.openSnackBar(`Product "${this.editingProduct!.name}" updated successfully.`, 'Close');
        this.editingProduct = null;
      });
  }

  deleteProduct(productId: string) {
    // console.log('delete product ', productId);
    this.product.deleteProduct(productId).subscribe((result) => {      
      if (result) {
        this.showLoginErrorSnackbar('Product Deleted Successfully');

        this.getAllProducts();
      }
    });
  }
  showLoginErrorSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  getAllProducts() {
    this.product.productList().subscribe((result) => {
      this.productList.data = result;
    })
  }
  cancelEdit(){
    this.editingProduct = null;
  }
}
