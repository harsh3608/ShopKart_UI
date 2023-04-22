import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/products/shared/services/cart.service';
import { Login } from '../shared/Models/login.model';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginRequest!: Login;
  public showPassword: boolean = false;
  isValidUser: boolean = false;
  cartId!: number ;

  constructor(
    private userService: UserService,
    private title: Title,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.deleteToken();
    this.loginForm = this.fb.group({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,15}')
      ])
    });
    this.title.setTitle('Login');
  }

  submitForm() {
    // debugger
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.loginRequest = this.loginForm.value;
      this.userService.loginUser(this.loginRequest).subscribe(res => {
        console.log(res);
        if (res.statusCode == 400) {
          this.isValidUser = false;
          this.router.navigate(['login']);
          this.showFailure();
        }
        else {
          this.showSuccess();
          this.isValidUser = true;
          this.authService.setToken(res.token);
          this.cartService.CheckCartOnLogin(res.id).subscribe(resCart => {
            // console.log(resCart);
            this.cartId = resCart.cartId;
          })
          this.router.navigate(['home/']);
        }
      })
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  showSuccess() {
    this.toastr.success('User Logged In Successfully!', 'Success!',{
      timeOut: 2000,
    });
  }

  showFailure() {
    this.toastr.error('User Not Found!', 'Failure', {
      timeOut: 2000,
    });
  }

  deleteToken(){
    if(!this.isValidUser){
      this.authService.removeToken();
    }
  }

  get Email(): FormControl {
    return this.loginForm.get("Email") as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get("Password") as FormControl;
  }

}
