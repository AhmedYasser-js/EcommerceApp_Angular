import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent {
  constructor(private _Renderer2: Renderer2) { }


  goToUp(): void {
    scrollTo(0, 0);
  }


  @ViewChild('btnUP') navElement!: ElementRef;

  @HostListener('window:scroll')
  onScroll(): void {
    if (scrollY > 700) {
      this._Renderer2.removeClass(this.navElement.nativeElement, 'd-none')
    } else {
      this._Renderer2.addClass(this.navElement.nativeElement, 'd-none')
    }
  }

}
