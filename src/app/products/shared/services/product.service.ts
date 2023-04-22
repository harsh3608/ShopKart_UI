import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  baseServerUrl = "https://localhost:7223/api/";

  getAllProducts( ) : Observable<Product[]>  {
    return this.http.get<Product[]>(this.baseServerUrl + 'Product/GetAll');
  }

  getProductById(id:any) : Observable<Product> {
    return this.http.get<Product>(this.baseServerUrl + 'Product/GetById/'+ id);
  }


}
