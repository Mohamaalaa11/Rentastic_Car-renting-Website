import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../car-rental/services/car.service';
import { Car } from '../../../../Car';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe({
      next: (res) => {
        const slicedArray = res.slice(0, 6);
        this.cars = slicedArray;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
