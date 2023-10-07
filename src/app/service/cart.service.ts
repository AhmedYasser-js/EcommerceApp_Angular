import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient: HttpClient) { }

  cartNum: BehaviorSubject<number> = new BehaviorSubject(0);

  // *ANCHOR --------------//////cart
  // myHeader: any = {
  //   token: localStorage.getItem('_token')
  // };


  addToCart(id: string): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: id,
      }
    );
  }


  getCart(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`)
  }


  removeCartItem(id: string): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`)
  }


  updateCart(id: string, countItem: number): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count: countItem
      }
    )
  }


  ClearCart(): Observable<any> {
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`)
  }



  checkOut(cart_id: string, orderDetails: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart_id}?url=http://localhost:4200`,

      {
        shippingAddress: orderDetails
      }
    );
  }


}
