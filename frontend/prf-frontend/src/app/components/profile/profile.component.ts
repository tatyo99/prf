import { Component, OnInit } from '@angular/core';
import { DrinkService } from 'src/app/services/drink.service';

interface PreviousBasketElement {
  title: string;
  amount: number;
  price: number;
}

export interface PreviousBaskets {
  date: String,
  basket: PreviousBasketElement[]
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  displayedColumns: string[] = ['title', 'amount', 'price'];
  myList: PreviousBaskets[];

  constructor(private drinkService: DrinkService) {
    this.myList = [];
  }

  ngOnInit(): void {
    this.drinkService.getBaskets().subscribe(objects => {
      this.myList = JSON.parse(objects);
    })
  }

}
