import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/shared/services/auth.service';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-cart-item-count',
  templateUrl: './cart-item-count.component.html',
  styleUrls: ['./cart-item-count.component.css']
})
export class CartItemCountComponent implements OnInit{
  cartId: number = 0;
  totalItems: number = 0;
  uid: number = 0;

  constructor(
    public cartService: CartService,
    private authService: AuthService,
  ){ }

  ngOnInit() {
    this.uid = this.authService.getUserId();

    this.cartService.getCartIdFromUserId(this.uid).subscribe(
      res => {
        this.cartId = Number(res);
        this.cartService.getCartAggregates(Number(res)).subscribe(
          obj => {
            this.totalItems = obj[0].totalItems;;
            //requestIdleCallback
          }
        );
      }
    );
  }

}
