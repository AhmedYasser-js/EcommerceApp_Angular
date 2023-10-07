import { Component, OnInit } from '@angular/core';
import { WishListService } from 'src/app/service/wish-list.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  constructor(private _WishListService: WishListService, private _ToastrService: ToastrService, private _CartService: CartService) { }

  totalItemsWishList: any;
  wishListData: any = {}


  ngOnInit(): void {
    this._WishListService.getToWishList().subscribe({
      next: (response) => {
        console.log(response)

        this.wishListData = response.data;
        console.log(this.wishListData)
      }
    })
  }

  addToWish(id: string): void {
    this._WishListService.addToWishList(id).subscribe({
      next: (response) => {
        console.log(response)

        this.wishListData = response.data;
        this._ToastrService.success(response.message + ' ❤️');
      }
    });
  }

  removFromWish(id: string, i: any): void {
    this._WishListService.removeItemFromWishList(id,).subscribe({
      next: (response) => {
        console.log(response)
        this.wishListData.splice(i, 1)
        // this.wishListData = response.data;
        // console.log(this.wishListData)
        this._ToastrService.success(response.message);

      }
    })
  }

  addProduct(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        console.log(response)
        this._CartService.cartNum.next(response.numOfCartItems);
        this._ToastrService.success(response.message + ' 🛺');

      }
    });
  }

}
