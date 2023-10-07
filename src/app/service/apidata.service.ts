import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApidataService {

  constructor(private _HttpClient: HttpClient) { }

  // myHeader: any = {
  //   token: localStorage.getItem('_token')
  // };


  // getCategories(): Observable<any> {
  //   return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  // }



  getProducts(pageNum: number = 1): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}`)
  }

  getProductsById(id: any): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }


  getCategories(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }


  getCategoriesDetails(id: any): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  }

  getAllSupCategories(id: any): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
  }

  getBrands(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  getSpecificBrands(id: any): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  }


  getAllorders(id: any): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
  }
}

