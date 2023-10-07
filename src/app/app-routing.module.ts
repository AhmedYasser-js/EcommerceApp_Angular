import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './auth.guard';
import { DetailsproductComponent } from './components/detailsproduct/detailsproduct.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { BrandsDetailsComponent } from './brands-details/brands-details.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
// import { ForgotpasswordComponent } from './setting/forgotpassword/forgotpassword.component';



const routes: Routes = [

  {
    path: '', component: BlankLayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },


      // { path: 'setting', loadChildren: () => import('./setting/setting.module').then((m) => m.SettingModule) },

      { path: 'home', canActivate: [authGuard], component: HomeComponent, title: 'home' },
      { path: 'cart', canActivate: [authGuard], component: CartComponent, title: 'cart' },
      { path: 'wishList', canActivate: [authGuard], component: WishListComponent, title: 'wishList' },
      { path: 'payment/:id', canActivate: [authGuard], component: PaymentComponent, title: 'payment' },
      { path: 'allorders/:id', canActivate: [authGuard], component: AllordersComponent, title: 'allorders' },
      { path: 'details/:id', canActivate: [authGuard], component: DetailsproductComponent, title: 'details' },

      { path: 'products', canActivate: [authGuard], component: ProductsComponent, title: 'products' },
      { path: 'categories', canActivate: [authGuard], component: CategoriesComponent, title: 'categories' },
      { path: 'categoryDetails/:id', canActivate: [authGuard], component: CategoryDetailsComponent, title: 'category Details' },
      { path: 'brands', canActivate: [authGuard], component: BrandsComponent, title: 'brands' },
      { path: 'brandsDetails/:id', canActivate: [authGuard], component: BrandsDetailsComponent, title: 'brands Details' },
    ]
  },

  {
    path: '', component: AuthLayoutComponent, children: [
      { path: 'login', component: LoginComponent, title: 'login' },
      { path: 'register', component: RegisterComponent, title: 'register' },
      { path: 'forgetPassword', component: ForgotPasswordComponent, title: 'ForgetPassword' },
      { path: 'resetPassword', component: ResetPasswordComponent, title: 'resetPassword' }

    ]
  },


  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
