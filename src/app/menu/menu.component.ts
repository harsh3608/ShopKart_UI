import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../products/shared/services/cart.service';
import { AuthService } from '../user/shared/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  id: number = 0;
  cartId: number = 0;
  totalItems: number = 0;
  name: string = '';

  constructor(private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private cartService: CartService,
  ) {
  }

  ngOnInit(): void {
    this.id = this.authService.getUserId();
    this.name = this.authService.getUserName();
    // this.getCartDetails();

    this.cartService.getCartIdFromUserId(this.id).subscribe(
      res => {
        this.cartId = Number(res);
        this.cartService.getCartAggregates(Number(res)).subscribe(
          obj => {
            this.totalItems = obj[0].totalItems;
          }
        );
      }
    );
  }

  loggedIn() {
    return this.authService.isLoggedIn();
  }

  logOut() {
    var val = confirm("Are you sure to Log Out ?")
    if (val == true) {
      this.authService.removeToken();
      this.router.navigate(['login']);
      this.showLogOut();
    }
  }

  showLogOut() {
    this.toastr.error('Pease, Login to continue !', 'Logged Out', {
      timeOut: 2000,
    });
  }

  
}


