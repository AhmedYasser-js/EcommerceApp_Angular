import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _AuthService: AuthService, private _Router: Router, private _FormBuilder: FormBuilder) { }

  isLoading: boolean = false;
  erorrMessage: string = ''

  registerForm: FormGroup = this._FormBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    rePassword: ['', [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    phon: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
  })

  // registerForm: FormGroup = new FormGroup({
  //   name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  //   rePassword: new FormControl('', [Validators.required, Validators.pattern(/^\w{6,}$/)]),
  //   phon: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  // })


  handleRegister(): void {
    this.isLoading = true;

    if (this.registerForm.valid) {
      this._AuthService.registerForm(this.registerForm.value).subscribe({
        next: (response) => {
          if (response.message) {
            this._Router.navigate(['/login'])
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error.message);
          this.isLoading = false;
          this.erorrMessage = error.error.message;
        }
      });
    }
  }
}




