import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/user/shared/services/auth.service';
import { CartProduct } from '../shared/models/cart.model';
import { Product } from '../shared/models/product.model';
import { CartService } from '../shared/services/cart.service';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  cartProduct!: CartProduct;
  kartId: number = 0;

  imageBaseLink: string = "https://localhost:7223/resources/";
  uid: number = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.uid = this.authService.getUserId();
    this.getAllProducts();
    this.cartService.getCartIdFromUserId(this.uid).subscribe(
      res => {
        this.kartId = Number(res);
      }
    );
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (obj) => {
        this.products = obj;
        // console.log(obj);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  addToCart(id: any) {
    // debugger
    this.cartProduct = {
      cartProductId: 0,
      cartId: this.kartId,
      productId: id
    };
    this.cartService.addProductToCart(this.cartProduct).subscribe(
      res => {
        if (res) {
          window.location.reload();
          this.showSuccess();
          //console.log(res);
        } else {
          this.showFailure();
          console.log('Adding Product Failure !');
        }
      }
    );
  }

  showSuccess() {
    this.toastr.success('Product Added Successfully !', 'Success!',{
      timeOut: 2000,
    });
  }

  showFailure() {
    this.toastr.error('Adding Product Failed !', 'Failure', {
      timeOut: 2000,
    });
  }

}
