import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../Models/user.model';
import { Login } from '../Models/login.model';
import { ReturnResponse } from '../Models/response.model';
import { PasswordResponse, UserEmailPassword, UserIdPassword } from '../Models/password.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseServerUrl = "https://localhost:7223/api/";

  getAllUsers( ) : Observable<User[]>  {
    return this.http.get<User[]>(this.baseServerUrl + 'User/GetAll');
  }

  addUser(user: User) : Observable<User[]>  {
    return this.http.post<User[]>(this.baseServerUrl + 'User/Add', user);
  }

  getUserById(id:any) : Observable<User> {
    return this.http.get<User>(this.baseServerUrl + 'User/GetById/'+ id);
  }

  updateUser(id:any, user: User) : Observable<User> {
    return this.http.put<User>(this.baseServerUrl + 'User/Update/'+ id, user);
  }

  deleteUser(id:any): Observable<User> {
    return this.http.delete<User>(this.baseServerUrl + 'User/Delete/'+ id);
  }

  loginUser(login: Login): Observable<ReturnResponse> {
    return this.http.post<ReturnResponse>(this.baseServerUrl + 'User/Login/', login);
  }

  forgetPassword(data: UserEmailPassword): Observable<PasswordResponse> {
    return this.http.put<PasswordResponse>(this.baseServerUrl + 'User/ForgetPassword/', data);
  }

  changePassword(id: number, data: UserIdPassword): Observable<PasswordResponse> {
    return this.http.put<PasswordResponse>(this.baseServerUrl + 'User/ChangePassword/'+id, data);
  }

}


