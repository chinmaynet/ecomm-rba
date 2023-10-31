// import { Component,EventEmitter, Inject, Output } from '@angular/core';
// import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { SellerHomeComponent } from '../seller-home/seller-home.component';
// import { Product } from 'src/app/data-type';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { ProductService } from 'src/app/home-services/product.service';
// @Component({
//   selector: 'app-edit-product-dialog',
//   templateUrl: './edit-product-dialog.component.html',
//   styleUrls: ['./edit-product-dialog.component.css']
// })
// export class EditProductDialogComponent {

//   editingProduct: Product;
//   constructor(public dialog: MatDialog, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<EditProductDialogComponent>, private product: ProductService,
//     @Inject(MAT_DIALOG_DATA) public data: Product) {
//     this.editingProduct = { ...data };
//     console.log("data got in edit popus is ", data);
//   }
//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   save(product: Product): void {
//     this.product.updateProduct(this.editingProduct!)
//       .subscribe(() => {

//         this.openSnackBar(`Product "${this.editingProduct!.name}" updated successfully.`, 'Close');
//         // this.editingProduct = null;
//       });
//   }

//   showLoginErrorSnackbar(message: string) {
//     this.snackBar.open(message, 'Close', {
//       duration: 5000,
//     });
//   }
//   openSnackBar(message: string, action: string) {
//     this.snackBar.open(message, action);
//   }
// }
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/home-services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/data-type';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: 'edit-product-dialog.component.html',
})export class EditProductDialogComponent {
  editingProduct: Product;
  editProductForm: FormGroup;
  imageURL: string | null = '/assets/blank_product1.png';
  constructor(
    public dialogRef: MatDialogRef<EditProductDialogComponent>,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.editingProduct = { ...data };
    console.log('data got in edit popup is ', this.editingProduct);

    this.editProductForm = this.fb.group({
      
      name: [this.editingProduct.name, Validators.required],
      price: [this.editingProduct.price, Validators.required],
      color: [this.editingProduct.color, Validators.required],
      catagory: [this.editingProduct.catagory, Validators.required],
      description: [this.editingProduct.description, Validators.required],
      ImageFiles: [null],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileChange(event: any) {
    const files: FileList = event.target.files;

    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageURL = e.target.result;
      };
      reader.readAsDataURL(files[0]);
    } else {
      this.imageURL = '/assets/blank_product1.png';
    }

    this.editProductForm.get('ImageFiles')!.setValue(files);
  }

  save() {
  
    if (this.editProductForm.valid) {
      console.log("form is ",this.editProductForm);
      const formData = new FormData();
      formData.append('id', this.editingProduct.id);
      formData.append('name', this.editingProduct.name);
      formData.append('price', this.editingProduct.price.toString());
      formData.append('color', this.editingProduct.color);
      formData.append('catagory',this.editingProduct.catagory);
      // formData.append('description', this.editProductForm.get('description')!.value);
      formData.append('description',this.editingProduct.description);
      // formData.append('productImages', this.editProductForm.get('productImages')!.value);
      const imageFiles: FileList = this.editProductForm.get('ImageFiles')!.value;
      if (imageFiles) {
        for (let i = 0; i < imageFiles.length; i++) {
          formData.append('ImageFiles', imageFiles[i]);
        }
      }
      
      formData.append('productImages', '[]');
      if(formData){
        console.log("formdatais ",formData);
      }
      console.log("form is ",this.editProductForm);
      this.productService.updateProduct(formData).subscribe(
        (response) => {          
          console.log("form is ",this.editProductForm);
          this.openSnackBar(`Product "${this.editingProduct.name}" updated successfully.`, 'Close');
          // this.openSnackBar(`Product "${this.editingProduct.color}" updated successfully.`, 'Close');
          console.log(response);
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
