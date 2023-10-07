import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor(private _FormBuilder: FormBuilder, private _CartService: CartService, private _ActivatedRoute: ActivatedRoute) { }


  checkForm: FormGroup = this._FormBuilder.group({
    details: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
  })



  id: any;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id')
      }
    })
  }


  handleForm(): void {
    console.log(this.checkForm.value);
    const cartDetails = this.checkForm.value;
    this._CartService.checkOut(this.id, cartDetails).subscribe({
      next: (response) => {
        // console.log(response.session.url)
        window.open(response.session.url, '_self')
      }
    })
  }

}
