import { Component, OnInit } from '@angular/core';
import { ApidataService } from 'src/app/service/apidata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from 'src/app/service/wish-list.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectHeart: any;
  heartclick: boolean = false;
  productsData: any[] = [];
  categoriesData: any[] = [];
  wishListData: any[] = [];
  term: string = '';

  constructor(
    private _ApidataService: ApidataService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _WishListService: WishListService
  ) { }

  ngOnInit(): void {

    this._ApidataService.getProducts().subscribe({
      next: (response) => {
        console.log(response.data);
        this.productsData = response.data;
      }
    });

    this._ApidataService.getCategories().subscribe({
      next: (response) => {
        this.categoriesData = response.data;
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




    // Initialize catOptions
    this.catOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 2000,
      autoplaySpeed: 1000,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 6
        }
      },
      nav: true
    };
  }

  catOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplaySpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  };

  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    nav: true
  };



  //*NOTE -
  addProduct(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        // console.log(response);
        this._CartService.cartNum.next(response.numOfCartItems);
        // console.log(this._CartService.cartNum);
        this._ToastrService.success(response.message + ' 🛺');


      }
    });
  }
  // 🛺
  //*NOTE -

  addToWish(id: any): void {
    this._WishListService.addToWishList(id).subscribe({
      next: (response) => {
        console.log(response)
        this._ToastrService.success(response.message + ' ❤️');
        if (response.status == "success") {
          this.heartclick = true;
          this.selectHeart = id;
          // this.isSelectedHeart(id)
          const newWishData = response.data.map((item: any) => item._id)
          console.log(newWishData);
          this.wishListData = response.data;
        }
      }
    });
  }

  //*NOTE -

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




  isSelectedHeart(id: any): boolean {
    return this.selectHeart === id;
  }


  roundNumber(num: number): number {
    return Math.round(num);
  }

}
