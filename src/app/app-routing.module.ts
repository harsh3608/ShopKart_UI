import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common-services/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CartComponent } from './products/cart/cart.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';

const routes: Routes = [{
  path: 'register',
  component: UserAddComponent
},
{
  path: 'login',
  component: UserLoginComponent
},
{
  path: 'forgetPassword',
  component: ForgetPasswordComponent
},
{
  path: 'menu',
  component: MenuComponent,
  canActivate: [AuthGuard]
},
{
  path: 'profile/:id',
  component: UserProfileComponent,
  canActivate: [AuthGuard]
},
{
  path: 'update/:id',
  component: UserUpdateComponent,
  canActivate: [AuthGuard]
},
{
  path: 'changePassword/:id',
  component: ChangePasswordComponent,
  canActivate: [AuthGuard]
},
{
  path: 'home',
  component: ProductListComponent,
  canActivate: [AuthGuard]
},
{
  path: 'cart/:cartId',
  component: CartComponent,
  canActivate: [AuthGuard]
},
{
  path: '',
  component: UserLoginComponent
},
{
  path: '**',
  component: PageNotFoundComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
