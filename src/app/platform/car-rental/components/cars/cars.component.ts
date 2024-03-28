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
  filteredCars: Car[] = [];
  models: string[] = [];
  colors: string[] = [];
  carName: string = '';
  carModel: string = '';

  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.carServices.getCars().subscribe({
      next: (res) => {
        this.cars = res;
        this.filteredCars = this.cars;
        this.getModels();
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

  onSearch() {
    if (this.carName !== '' || this.carModel !== '') {
      this.filteredCars = this.cars.filter((car) => {
        return (
          car.Name.toLocaleLowerCase().match(
            this.carName.toLocaleLowerCase()
          ) ||
          car.Brand.toLocaleLowerCase().match(this.carModel.toLocaleLowerCase())
        );
      });
    } else {
      this.ngOnInit();
    }
  }
}
