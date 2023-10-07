import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor(private _HttpClient: HttpClient) { }

  cartNum: BehaviorSubject<number> = new BehaviorSubject(0);


  addToWishList(id: string): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId: id,
      }
    );
  }

  getToWishList(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`);
  }

  removeItemFromWishList(id: any): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`)
  }


}
