import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface Drink {
  name: string,
  title: string,
  type: string,
  description: string,
  price: number,
  imageUrl: string
}

export interface BasketElement {
  name: string;
  title: string;
  amount: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  choosedDrinks: BasketElement[] = [];
  myDate = new Date();

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  getDrink(route: String) {
    return this.http.get(environment.serverUrl + route, {withCredentials: true, responseType: 'text'});
  }

  addDrink(name: string, title: string, amount: number, price: number) {
    let isInTheTable = false;
    this.choosedDrinks.forEach((value)=>{
      if(value.name === name) {
        value.amount += amount;
        value.price += (amount * price);
        isInTheTable = true;
      }
    });
    if(!isInTheTable) {
      let tmp = {name: name, title: title, amount: amount, price: amount * price};
      this.choosedDrinks.push(tmp);
    }
  }

  buyBasket(array: BasketElement[]) {
    this.myDate = new Date();
    let date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd:HH-mm-ss');
    this.choosedDrinks = [];
    return this.http.post(environment.serverUrl + 'basket', {date: date, basket: array}, {withCredentials: true, responseType: 'text'});
  }

  getBaskets() {
    return this.http.get(environment.serverUrl + 'basket', {withCredentials: true, responseType: 'text'});
  }

}
