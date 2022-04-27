import { Component, OnInit } from '@angular/core';
import { BasketElement, DrinkService } from 'src/app/services/drink.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  displayedColumns: string[] = ['title', 'amount', 'price', 'delete'];
  dataSource: BasketElement[];

  constructor(private drinkService: DrinkService, private _snackBar: MatSnackBar) {
    this.dataSource = this.drinkService.choosedDrinks;
  }

  ngOnInit(): void {
    
  }

  RemoveElementFromArray(element: BasketElement) {
    this.dataSource.forEach((value,index)=>{
        if(value.name === element.name) this.dataSource.splice(index,1);
    });
    //refresh
    let cloned = this.dataSource.slice();
    this.dataSource = cloned;
    this._snackBar.open('Succesfully removed from the basket!', 'Close', {duration: 2000});
  }

  buyBasket() {
    if(this.dataSource.length > 0) {
      this.drinkService.buyBasket(this.dataSource).subscribe(msg => {
        console.log(msg);
        let cloned = [] as BasketElement[];
        this.dataSource = cloned;
        this._snackBar.open('Succesful buy!', 'Close', {duration: 2000});
      });
    } else {
      this._snackBar.open('Nothing to buy!', 'Close', {duration: 2000});
    }
  }

}
