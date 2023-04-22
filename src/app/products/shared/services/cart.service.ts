import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart, CartAggregate, CartProduct, CartResponse, ShowCart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  baseServerUrl = "https://localhost:7223/api/";

  addNewCart(cart: Cart) {
    return this.http.post(this.baseServerUrl + 'Cart/AddCart', cart);
  }

  CheckCartOnLogin(uid: any): Observable<CartResponse> {
    return this.http.post<CartResponse>(this.baseServerUrl + 'Cart/CheckCartOnLogin', uid );
  }

  addProductToCart(cartProduct: CartProduct):Observable<CartProduct> {
    return this.http.post<CartProduct>(this.baseServerUrl + 'Cart/AddProduct', cartProduct);
  }

  getCartIdFromUserId(uid: any) {
    return this.http.get(this.baseServerUrl + 'Cart/GetCIDFromUID/' + uid);
  }

  getCartById(id: any): Observable<Cart> {
    return this.http.get<Cart>(this.baseServerUrl + 'Cart/GetCartById/' + id);
  }

  getCartProducts(cartId: any): Observable<ShowCart[]> {
    return this.http.get<ShowCart[]>(this.baseServerUrl + 'Cart/GetCartProducts/' + cartId);
  }

  getCartAggregates(cartId: any): Observable<CartAggregate[]> {
    return this.http.get<CartAggregate[]>(this.baseServerUrl + 'Cart/GetCartAggregate/' + cartId);
  }

  deleteProductsFromCart(id: any):Observable<CartProduct> {
    return this.http.delete<CartProduct>(this.baseServerUrl + 'Cart/DeleteProduct/' + id);
  }

  emptyCart(cartId: any):Observable<boolean> {
    return this.http.delete<boolean>(this.baseServerUrl + 'Cart/EmptyCart/' + cartId);
  }

  deleteCart(id: any) {
    return this.http.delete(this.baseServerUrl + 'Cart/DeleteCart/' + id);
  }

}
