import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Product } from '../../data-type';
import { ProductService } from '../../home-services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  productForm: FormGroup;
  imageURL: string | null = '/assets/blank_product1.png';
  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, Validators.required],
      color: ['', Validators.required],
      catagory: ['', Validators.required],
      description: ['', Validators.required],
      ImageFiles: [null],
    });
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

    this.productForm.get('ImageFiles')!.setValue(files);
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')!.value);
      formData.append('price', this.productForm.get('price')!.value.toString());
      formData.append('color', this.productForm.get('color')!.value);
      formData.append('catagory', this.productForm.get('catagory')!.value);
      formData.append('description', this.productForm.get('description')!.value);

      const files: FileList = this.productForm.get('ImageFiles')!.value;
      for (let i = 0; i < files.length; i++) {
        formData.append('ImageFiles', files[i]);
      }
      formData.append('productImages', '[]');
      this.productService.addProduct(formData).subscribe((response) => {
        if (response) {
          this.showLoginErrorSnackbar('Product Added Successfully');
          this.productForm.reset();
          // this.router.navigate(['/seller-add-product'])
        }
      });
    }
  }
  showLoginErrorSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }

}