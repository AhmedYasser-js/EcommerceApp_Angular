import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApidataService } from 'src/app/service/apidata.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {

  totalItemsCart: any;
  allordersData: any = {};

  // Define the user ID here
  // userId: string = '6407cf6f515bdcf347c09f17';

  constructor(private _ActivatedRoute: ActivatedRoute, private _ApidataService: ApidataService, private _CartService: CartService) { }

  productId: any;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
      }
    })

    this._ApidataService.getAllorders(this.productId).subscribe({
      next: (value) => {
        console.log(value)
        this.allordersData = value.data.user.id;
        console.log(this.allordersData)



      },
    })
  }
}
