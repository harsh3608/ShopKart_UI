import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/Models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit{
  editRequest!: User;
  editUserForm!: FormGroup;
  user!: User;
  uid!: number;
  public showPassword: boolean = false;

  constructor(
    private userService: UserService,
    private title: Title,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Register');
    this.editUserForm = this.fb.group({
      id: '',
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
    } 
    );

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.userService.getUserById(id).subscribe({
            next: (res) => {
              this.user = res;
              this.editUserForm.setValue(this.user);
            }
          })
        }
      }
    })
  }

  submitEditForm() {
    this.editRequest = this.editUserForm.value;
    if (this.editUserForm.valid) {
      this.userService.updateUser(
        this.editRequest.id,
        this.editRequest
      ).subscribe({
        next: (response) => {
          this.router.navigate(['profile/', response.id]);
          this.showSuccess();
        }
      })
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  showSuccess() {
    this.toastr.success('User Details Updated Successfully!', 'Success!', { timeOut: 2000 });
  }

  onCancel() {
    this.router.navigate(['profile/',this.user.id]);
  }


  get firstName(): FormControl {
    return this.editUserForm.get("firstName") as FormControl;
  }
  get lastName(): FormControl {
    return this.editUserForm.get("lastName") as FormControl;
  }
  get mobile(): FormControl {
    return this.editUserForm.get("mobile") as FormControl;
  }
  get address(): FormControl {
    return this.editUserForm.get("address") as FormControl;
  }
  get Email(): FormControl {
    return this.editUserForm.get("email") as FormControl;
  }
  get IsPrimeMember(): FormControl {
    return this.editUserForm.get("isPrimeMember") as FormControl;
  }
  get Password(): FormControl {
    return this.editUserForm.get("password") as FormControl;
  }

}
