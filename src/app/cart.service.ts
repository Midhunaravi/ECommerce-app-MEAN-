import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  itemsSource = new BehaviorSubject([]);
  currentItems = this.itemsSource.asObservable()
  cartItems: any = [];

  constructor() { }

  addItem(newCartItem: any) {
// checks if the id of current item and new item are same
    const prevCartItem = this.cartItems.find((el:any) => el.product._id == newCartItem.product._id);

    if(prevCartItem){
        //if then update qty by +1 
        this.cartItems = this.cartItems.map((item:any) => {
          if(item.product_id == prevCartItem.product_id){
            item.qty = item.qty + 1;
          }
          return item
        })
    }else{
      //add as new item
      this.cartItems.push(newCartItem);
    }

    
    this.itemsSource.next(this.cartItems);
  }

  updateItems(items:[]){
    this.cartItems = items;
    this.itemsSource.next(this.cartItems);
  }
}
