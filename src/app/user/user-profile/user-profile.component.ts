import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/Models/user.model';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user!: User;
  uid: number = 0;

  constructor(private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.userService.getUserById(id).subscribe({
            next: (res) => {
              this.user = res;
              this.uid = res.id;
            }
          });
        }
      }
    })
  }

  logOut() {
    var val = confirm("Are you sure to Log Out ?");
    if (val) {
      this.authService.removeToken();
      this.router.navigate(['login']);
      this.showLogOut();
    }
  }

  showLogOut() {
    this.toastr.error('Please, Login to continue !', 'Logged Out', {
      timeOut: 2000,
    });
  }

  confirmChangePass(id: any) {
    this.router.navigate(['/changePassword/', id])
  }

}
