import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { CartResponse } from 'src/app/products/shared/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelperService = new JwtHelperService()

  constructor() { }

  setToken(token: string) {
    localStorage.setItem("access_token", token);
    this.loadCurrentUser();
  }

  // setCart(response: CartResponse){
  //   localStorage.setItem("cart", String(response));
  // }

  loadCurrentUser() {
    const token = localStorage.getItem("access_token");
    const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;
    if (userInfo) {
      this.currentUser.next(userInfo);
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("access_token") ? true : false
  }

  getUserId(): number {
    const token = localStorage.getItem("access_token");
    const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;
    const id = Number(userInfo.id);
    // console.log(id);
    return id;
  }

  getUserName(): string {
    const token = localStorage.getItem("access_token");
    const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;
    const name = String(userInfo.firstName);
    return name;
  }

  removeToken() {
    localStorage.removeItem("access_token");
    localStorage.clear();

  }
}
