import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserIdPassword } from '../shared/Models/password.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passForm!: FormGroup;
  public showPassword: boolean = false;
  public showOldPassword: boolean = false;
  passRequest!: UserIdPassword;
  uid: number = 0;

  constructor(
    private userService: UserService,
    private title: Title,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.title.setTitle('Change Password');
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.userService.getUserById(id).subscribe({
            next: (res) => {
              this.uid = res.id;
            }
          });
        }
      }
    })
    this.passForm = this.fb.group({
      oldPassword: new FormControl('', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,15}')
      ]),
      newPassword: new FormControl('', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,15}')
      ]),
      repeatPassword: new FormControl('', [Validators.required])
    }, { validators: this.checkPasswords }
    );
  }


  submitForm() {
    debugger
    var val = confirm('Are you sure to Change Password ?');
    if (val) {
      this.passForm.markAllAsTouched();
      if (this.passForm.valid) {
        this.passRequest = this.passForm.value;
        this.userService.changePassword(this.uid, this.passRequest).subscribe(res => {
          if (res.statusCode == 200) {
            this.router.navigate(['/profile/', this.uid]);
            this.showSuccess();
          }else if(res.statusCode == 400){
            this.passForm.reset();
            this.showFailure();
          };
        });
      };

    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public toggleOldPasswordVisibility(): void {
    this.showOldPassword = !this.showOldPassword;
  }

  showSuccess() {
    this.toastr.success('Password Changed Successfully!', 'Success!', { timeOut: 2000 });
  }

  showFailure() {
    this.toastr.error('Error Occured while changing password !', 'Failure', {
      timeOut: 2000,
    });
  }

  checkPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let pass = control.get('newPassword')?.value
    let confirmPass = control.get('repeatPassword')?.value
    return pass == confirmPass ? null : { notSame: true }
  }

  get OldPassword(): FormControl {
    return this.passForm.get("oldPassword") as FormControl;
  }
  get NewPassword(): FormControl {
    return this.passForm.get("newPassword") as FormControl;
  }

  get rptpswd(): FormControl {
    return this.passForm.get("repeatPassword") as FormControl;
  }
}
