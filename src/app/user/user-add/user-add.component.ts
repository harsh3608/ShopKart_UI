import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/Models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  addRequest!: User;
  addUserForm!: FormGroup;
  public showPassword: boolean = false;

  constructor(
    private userService: UserService,
    private title: Title,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.title.setTitle('Register');
    this.addUserForm = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z]*")]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern("[a-zA-Z]*")]),
      mobile: new FormControl('', [Validators.required, Validators.pattern("[0-9]*.{10,10}")]),
      address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$")]),
      isPrimeMember: new FormControl(false),
      password: new FormControl('', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,15}')
      ]),
      repeatPassword: new FormControl('', [Validators.required])

    }
      , { validators: this.checkPasswords }
    );
  }

  submitAddForm() {
    this.addUserForm.markAllAsTouched();
    if (this.addUserForm.valid) {
      this.addRequest = this.addUserForm.value;
      this.userService.addUser(this.addRequest).subscribe(res => {
        //console.log(res);
        this.router.navigate(['login']);
        this.showSuccess();
        this.showWarning();
      })
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  showSuccess() {
    this.toastr.success('User Registered Successfully!', 'Success!', {timeOut: 2000});
  }

  showWarning() {
    this.toastr.warning('Please, Log In!','LogIn Required!', {timeOut: 2000})
  }

  checkPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let pass = control.get('password')?.value
    let confirmPass = control.get('repeatPassword')?.value
    return pass == confirmPass ? null : { notSame: true }
  }


  get firstName(): FormControl {
    return this.addUserForm.get("firstName") as FormControl;
  }
  get lastName(): FormControl {
    return this.addUserForm.get("lastName") as FormControl;
  }
  get mobile(): FormControl {
    return this.addUserForm.get("mobile") as FormControl;
  }
  get address(): FormControl {
    return this.addUserForm.get("address") as FormControl;
  }
  get Email(): FormControl {
    return this.addUserForm.get("email") as FormControl;
  }
  get IsPrimeMember(): FormControl {
    return this.addUserForm.get("isPrimeMember") as FormControl;
  }
  get Password(): FormControl {
    return this.addUserForm.get("password") as FormControl;
  }

  get rptpswd(): FormControl {
    return this.addUserForm.get("repeatPassword") as FormControl;
  }

}
