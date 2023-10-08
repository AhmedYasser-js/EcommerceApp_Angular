import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApidataService } from 'src/app/service/apidata.service';
import { CartService } from 'src/app/service/cart.service';
import { WishListService } from 'src/app/service/wish-list.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productsData: any[] = [];
  pageSize: number = 0;//limit
  currentPage: number = 1;
  total: number = 0;
  term: string = '';
  wishListData: any[] = [];

  constructor(
    private _ApidataService: ApidataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishListService: WishListService
  ) { }

  ngOnInit(): void {
    this._ApidataService.getProducts().subscribe({
      next: (response) => {
        console.log(response);
        this.productsData = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results
      }
    });

    this._WishListService.getToWishList().subscribe({
      next: (response) => {
        console.log(response)

        const newWishData = response.data.map((item: any) => item._id)
        console.log(newWishData);
        this.wishListData = newWishData;
      }
    })




  }



  addProduct(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        console.log(response)
        this._CartService.cartNum.next(response.numOfCartItems);
        console.log(this._CartService.cartNum);
        this._ToastrService.success('It has been successfully added. 🛺')
      }
    })
  }


  pageChanged(event: any): void {

    this._ApidataService.getProducts(event).subscribe({
      next: (response) => {
        console.log(response);
        this.productsData = response.data;
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results
      }
    });

  }


  roundNumber(num: number): number {
    return Math.round(num);
  }



  // addToWish(id: string): void {
  //   this._WishListService.addToWishList(id).subscribe({
  //     next: (response) => {
  //       console.log(response)
  //       // this._WishListService.cartNum.next(response.numOfCartItems);
  //       // console.log(this._WishListService.cartNum);
  //       this._ToastrService.success(response.message + ' ❤️');
  //     }
  //   });
  // }



  addToWish(id: any): void {
    this._WishListService.addToWishList(id).subscribe({
      next: (response) => {
        console.log(response)
        this._ToastrService.success(response.message + ' ❤️');
        if (response.status == "success") {
          // this.isSelectedHeart(id)
          const newWishData = response.data.map((item: any) => item._id)
          console.log(newWishData);
          this.wishListData = response.data;
        }
      }
    });
  }


  removFromWishList(id: string): void {
    this._WishListService.removeItemFromWishList(id,).subscribe({
      next: (response) => {
        console.log(response)
        // this.wishListData.splice(i, 1)
        // this.wishListData = response.data;
        // console.log(this.wishListData)
        this._ToastrService.success(response.message);
        const newWishData = response.data.map((item: any) => item._id)
        console.log(newWishData);
        this.wishListData = response.data;

      }
    })
  }


}
