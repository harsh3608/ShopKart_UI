import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { ToastrModule } from 'ngx-toastr';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { MenuComponent } from './menu/menu.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CartComponent } from './products/cart/cart.component';
import {TooltipModule} from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { ForgetPasswordComponent } from './user/forget-password/forget-password.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { CartItemCountComponent } from './products/cart-item-count/cart-item-count.component';



@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserAddComponent,
    UserProfileComponent,
    PageNotFoundComponent,
    ProductListComponent,
    MenuComponent,
    UserUpdateComponent,
    CartComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
    CartItemCountComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    ToastrModule.forRoot(),
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    TooltipModule,
    RippleModule,
  ],
  providers: [
    Title,
    CartComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
