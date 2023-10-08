import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { ApidataService } from 'src/app/service/apidata.service';
import { CartService } from 'src/app/service/cart.service';
import { WishListService } from 'src/app/service/wish-list.service';

@Component({
  selector: 'app-detailsproduct',
  templateUrl: './detailsproduct.component.html',
  styleUrls: ['./detailsproduct.component.scss']
})
export class DetailsproductComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute,
    private _ApidataService: ApidataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishListService: WishListService) { }

  productDetails: any = {}
  productId: any;
  // total: number = 0;
  wishListData: any[] = [];



  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
      }
    })


    this._ApidataService.getProductsById(this.productId).subscribe({
      next: (response) => {
        this.productDetails = response.data
      }
    })

    this._WishListService.getToWishList().subscribe({
      next: (response) => {
        console.log(response)

        const newWishData = response.data.map((item: any) => item._id)
        console.log(newWishData);
        this.wishListData = newWishData;
      }
    })


  }

  productSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    autoplay: true,
    nav: false
  };

  totalItemsCart: any;


  addProduct(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        console.log(response)
        // console.log(response.numOfCartItems)
        // this.totalItemsCart = response.numOfCartItems
        // this._CartService.cartNum = response.numOfCartItems;
        this._CartService.cartNum.next(response.numOfCartItems);

        console.log(this._CartService.cartNum)
        this._ToastrService.success('It has been successfully added. 🛺')

      }
    })
  }


  roundNumber(num: number): number {
    return Math.round(num);
  }


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
