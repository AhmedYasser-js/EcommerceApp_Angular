import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  isLoading: boolean = false;
  errorMessage: string = '';

  resetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  })


  resetPassword(resetForm: FormGroup): void {
    this.isLoading = true;
    this._AuthService.resetPassword(resetForm.value).subscribe({
      next: (response) => {
        console.log(response)
        this.isLoading = false;
        if (response.token) {
          this._Router.navigate(['/login'])
        }
      },
      error: (error) => {
        console.log(error)
        this.isLoading = false;
        this.errorMessage = error.error.message
      }
    })
  }





}
