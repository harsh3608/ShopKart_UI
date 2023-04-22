import { Component, NgModule, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PrimeNGConfig } from 'primeng/api';
import { CartAggregate, CartProduct, ShowCart, } from '../shared/models/cart.model';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {

  products: ShowCart[] = [];
  aggregates: CartAggregate[] = [];
  imageBaseLink: string = "https://localhost:7223/resources/";
  totalPrice!: number;
  totalItems!: number;
  isKartEmpty!: boolean;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.getCart();
    //this.showTemplate();
    this.primengConfig.ripple = true;
  }

  removeProductFromCart(id: any) {
    this.cartService.deleteProductsFromCart(id).subscribe({
      next: (res) => {
        if (res) {
          window.location.reload();
          this.getCart();
          this.showInfo();
          console.log(res);
        }
      }
    })
  }

  getCart() {
    this.route.paramMap.subscribe({
      next: (params) => {
        const cartId = params.get('cartId');
        if (cartId) {
          this.cartService.getCartProducts(cartId).subscribe({
            next: (obj) => {
              this.products = obj;
            },
            error: (response) => {
              console.log(response)
            }
          });
          this.cartService.getCartAggregates(cartId).subscribe({
            next: (obj) => {
              this.totalPrice = obj[0].totalPrice;
              this.totalItems = obj[0].totalItems;
              this.showTemplate();
            },
            error: (response) => {
              console.log(response)
            }
          })
        }
      }
    });
  }

  emptyCart() {
    var val = confirm("Are you sure to Empty your Kart ?")
    if(val == true){
      this.route.paramMap.subscribe({
        next: (params) => {
          const cartId = params.get('cartId');
          if (cartId) {
            this.cartService.emptyCart(cartId).subscribe({
              next: (res) => {
                if (res) {
                  this.showEmptyInfo();
                  this.getCart();
                  window.location.reload();
                  //this.showTemplate();
                }
              }
            })
          }
        }
      })
    }else{
      console.log(val);
      this.getCart();
    }
  }

  showTemplate() {
    if (this.totalItems == 0) {
      this.isKartEmpty = true;
    };
  }

  // showSuccess() {
  //   this.toastr.success('Product Added Successfully !', 'Success!', {
  //     timeOut: 2000,
  //   });
  // }

  showInfo() {
    this.toastr.info('Product Removed from the Kart !', 'Info', {
      timeOut: 2000,
    });
  }

  showEmptyInfo() {
    this.toastr.info('Kart emptied Successfully !', 'Info', {
      timeOut: 2000,
    });
  }

}
