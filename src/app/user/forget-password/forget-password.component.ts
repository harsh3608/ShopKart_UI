import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserEmailPassword } from '../shared/Models/password.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit{
  passForm!: FormGroup;
  public showPassword: boolean = false;
  passRequest!: UserEmailPassword;

  constructor(
    private title: Title,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.passForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required, Validators.pattern("[0-9]*.{10,10}")]),
      newPassword: new FormControl('', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,15}')
      ]),
      repeatPassword: new FormControl('', [Validators.required])
    }, { validators: this.checkPasswords });
    this.title.setTitle('Forget Password');
  }

  submitForm(){
    debugger
    this.passForm.markAllAsTouched();
    if (this.passForm.valid) {
      this.passRequest = this.passForm.value;
      this.userService.forgetPassword(this.passRequest).subscribe(res => {
        if(res.statusCode == 200){
          this.router.navigate(['login']);
          this.showSuccess();
          this.showWarning();
        }else{
          this.passForm.reset();
          this.showFailure();
        }

      })
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  checkPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let pass = control.get('newPassword')?.value
    let confirmPass = control.get('repeatPassword')?.value
    return pass == confirmPass ? null : { notSame: true }
  }

  showSuccess() {
    this.toastr.success('Password Changed Successfully!', 'Success!', {timeOut: 1800});
  }

  showWarning() {
    this.toastr.warning('Please Log In to continue !','LogIn Required!', {timeOut: 1800})
  }
  showFailure() {
    this.toastr.error('User Not Found! Please enter valid details.', 'Failure', {
      timeOut: 2000,
    });
  }

  get Email(): FormControl {
    return this.passForm.get("email") as FormControl;
  }
  get mobile(): FormControl {
    return this.passForm.get("mobile") as FormControl;
  }
  get Password(): FormControl {
    return this.passForm.get("newPassword") as FormControl;
  }

  get rptpswd(): FormControl {
    return this.passForm.get("repeatPassword") as FormControl;
  }
}
