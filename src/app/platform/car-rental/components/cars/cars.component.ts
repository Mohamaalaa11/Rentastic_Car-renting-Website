import { Component, OnInit } from '@angular/core';
import { Car } from '../../types/car';
import { CarService } from '../../services/car.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  constructor(private carServices: CarService) {}

  cars: Car[] = [];
  models: string[] = [];
  colors: string[] = [];

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.carServices.getCars().subscribe({
      next: (res) => {
        this.cars = res;
        console.log(this.cars);
        this.getModels();
        console.log(this.models);
        this.getColors();
      },
    });
  }

  getModels() {
    this.models = Array.from(new Set(this.cars.map((car) => car.Brand)));
  }
  getColors() {
    this.colors = Array.from(new Set(this.cars.map((car) => car.Color)));
  }
}
