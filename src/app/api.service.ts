import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  productSource = new BehaviorSubject([]);
  currentProducts = this.productSource.asObservable();
  productsTmp = [];
  getProducts(){
    this.http.get(environment.apiUrl+'/api/v1/products').subscribe((data : any) => {
      this.productSource.next(data)
      this.productsTmp = data;
    })
  }

  searchProducts(searchText: string) {
    this.http.get(environment.apiUrl + '/api/v1/products', {
      params: { keyword: searchText }
    }).subscribe((data : any) => {
      this.productSource.next(data)
    })

  }

  clearSearch(searchText:string){
    if(searchText == ''){
      this.productSource.next(this.productsTmp)
    }
  }

  getSingleProduct(id:string){
    return this.http.get(environment.apiUrl+'/api/v1/products/'+id)
  }

  orderCreate(order: any) {
    return this.http.post(environment.apiUrl+'/api/v1/orders', order);
  }
  
}
