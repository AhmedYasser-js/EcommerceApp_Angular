import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(private _AuthService: AuthService, private _Router: Router) { }

  isLoading: boolean = false;
  errorMessage = '';

  LoginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  })


  handleLogin(): void {
    this.isLoading = true;

    if (this.LoginForm.valid) {
      this._AuthService.LoginForm(this.LoginForm.value).subscribe({
        next: (response) => {
          if (response.message = 'success') {
            localStorage.setItem('_token', response.token)
            this._Router.navigate(['/home'])
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error.message);
          this.isLoading = false;
          this.errorMessage = error.error.message;
        }
      });
    }
  }

}
