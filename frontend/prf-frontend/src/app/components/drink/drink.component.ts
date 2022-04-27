import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DrinkService } from 'src/app/services/drink.service';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.css']
})
export class DrinkComponent implements OnInit {

  href: string;
  drinks: any[];

  constructor(private drinkService: DrinkService, private router: Router, private _snackBar: MatSnackBar) {
    this.href = "";
    this.drinks = [];
  }

  ngOnInit(): void {
    this.href = this.router.url.split("/", 2)[1];
    this.drinkService.getDrink(this.href).subscribe(objects => {
      this.drinks = JSON.parse(objects);
    })
  }

  addToBasket(name: string, amount: string) {
    let tmp = this.drinks.find(element => element.name === name);
    this.drinkService.addDrink(name, tmp.title, Number(amount), tmp.price);
    this._snackBar.open('Succesfully added to the basket!', 'Close', {duration: 2000});
  }

}
