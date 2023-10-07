import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-navbar-blank',
  templateUrl: './navbar-blank.component.html',
  styleUrls: ['./navbar-blank.component.scss']
})
export class NavbarBlankComponent implements OnInit {
  constructor(private _Router: Router, private _CartService: CartService, private _Renderer2: Renderer2) { }

  @ViewChild('navBar') navElement!: ElementRef;

  @HostListener('window:scroll')
  onScroll(): void {
    if (scrollY > 500) {
      this._Renderer2.addClass(this.navElement.nativeElement, 'px-5')
    } else {
      this._Renderer2.removeClass(this.navElement.nativeElement, 'px-5')
    }
  }


  cartCount: number = 0;

  ngOnInit(): void {
    // this.cartCount = this._CartService.cartNum;
    this._CartService.cartNum.subscribe({
      next: (data) => {
        // console.log(data)
        this.cartCount = data;
      }
    })

    this._CartService.getCart().subscribe(
      {
        next: (response) => {
          // console.log(response)
          this._CartService.cartNum.next(response.numOfCartItems)

        }
      }
    )
  }

  signout(): void {
    localStorage.removeItem('_token')
    this._Router.navigate(['/login'])
  }
}
