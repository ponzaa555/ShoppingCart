import { Injectable } from '@angular/core';
import { environment } from '../../env/env';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket|null>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals|null>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) {}

  getBasket(id: string) {
    return this.http.get<IBasket>(this.baseUrl + 'Basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
      })
    );
  }

  setBasket(basket: IBasket) {
    console.log(basket);
    return this.http.post<IBasket>(this.baseUrl + 'Basket',basket).subscribe(
      (response: IBasket) => {
        this.basketSource.next(response);
        this.calculateTotals();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductToBasketItme(item, quantity);
    // if this.getCurrentBasketValue() is null return afeter ?
    const baseket = this.getCurrentBasketValue() ??  this.createBasket()

    // Check item exist on basket ?
    baseket.items = this.addOrUpdateItem(baseket.items , itemToAdd , quantity);
    this.setBasket(baseket);
  }

  incrementItemQuantity(item : IBasketItem){
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket!.items.findIndex(x => x.id === item.id);
    basket!.items[foundItemIndex].quantity++;
    this.setBasket(basket!);
  }

  decrementItemQuantity(item : IBasketItem){
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket!.items.findIndex(x => x.id === item.id);
    if(basket!.items[foundItemIndex].quantity > 1){
      basket!.items[foundItemIndex].quantity-- ;
      this.setBasket(basket!);
    }else{
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item : IBasketItem){
    const baseket = this.getCurrentBasketValue();
    if(baseket?.items.some(x => x.id === item.id)){
      baseket.items = baseket.items.filter(i => i.id !== item.id);
      if(baseket.items.length > 0 ){
        this.setBasket(baseket)
      }else{
        this.deleteBasket(baseket);
      }
    }
  }

  deleteBasket(baseket : IBasket){
    return this.http.delete(this.baseUrl + "Basket?id=" + baseket.id).subscribe(() => {
      this.basketSource.next(null);
      this.basketTotalSource.next(null);
      localStorage.removeItem('basket_id');
    }, error => {
      console.log(error);
    });
  } 
  private addOrUpdateItem(items:IBasketItem[] , itemToAdd : IBasketItem , quantity : number) : IBasketItem[]{
    const index = items.findIndex(item => item.id === itemToAdd.id);
    if (index === -1){
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }else{
      items[index].quantity += quantity;
    }
    return items;
  }
  mapProductToBasketItme(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity: quantity,
      brand: item.productBrand,
      type: item.productType,
    } as IBasketItem; 
  }

  private createBasket():IBasket{
    const basket = new Basket()
    localStorage.setItem('basket_id' , basket.id);
    return basket;
  }

  private calculateTotals(){
    const baseket = this.getCurrentBasketValue();
    const shiping = 0;
    // reduce function a is initail value set to 0 and loop thought array then plus to a
    const subtotal = baseket === null ? 0 : baseket.items.reduce((a,b) => (b.price * b.quantity) + a , 0)
    const total = subtotal + shiping
    this.basketTotalSource.next({
      shipping: shiping,
      subtotal: subtotal,
      total : total
    } as IBasketTotals)
  }
}
