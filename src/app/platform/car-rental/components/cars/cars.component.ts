import { Component, OnInit } from '@angular/core';
import { Car } from '../../types/car';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  constructor(private carServices: CarService) {}

  cars: Car[] = [];
  models: string[] = [];

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.carServices.getCars().subscribe({
      next: (res) => {
        this.cars = JSON.parse(JSON.stringify(res));
        this.getModels();
        console.log(this.models);
      },
    });
  }

  getModels() {
    this.models = Array.from(new Set(this.cars.map((car) => car.brand)));
  }
}
