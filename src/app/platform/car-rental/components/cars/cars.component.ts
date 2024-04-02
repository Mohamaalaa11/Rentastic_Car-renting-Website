import { Component, OnInit } from '@angular/core';
import { Car } from '../../types/car';
import { CarService } from '../../services/car.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarFilter } from '../../types/car-filter';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  constructor(
    private carServices: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  cars: Car[] = [];
  filteredCars: Car[] = [];
  models: string[] = [];
  colors: string[] = [];
  carName: string = '';
  carModel = '';
  sortOrder: string = 'default';

  cars$: Observable<Car[]> = this.carServices.cars$;
  carBrand$: Observable<string[]> = this.carServices.carsBrand$;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // Fetch filtered cars or all cars based on query parameters
      if (params['brand'] && params['startYear']) {
        const carFilter: CarFilter = {
          brand: params['brand'],
          startYear: params['startYear'],
          startMonth: params['startMonth'],
          startDay: params['startDay'],
          endYear: params['endYear'],
          endMonth: params['endMonth'],
          endDay: params['endMonth'],
        };
        this.getFilteredCars(carFilter);
      } else {
        this.getCars(); // Fetch all cars
      }
    });
  }

  getCars() {
    this.carServices.getCars().subscribe({
      next: (res) => {
        this.cars = res;
        this.filteredCars = this.cars;
        // this.carServices.cars$.next(res);

        // console.log(res);
        // this.getModels();
        // this.getColors();
      },
    });
  }

  getFilteredCars(carFilter: CarFilter) {
    this.carServices.getFilterdCarsByDate(carFilter).subscribe({
      next: (res) => {
        this.filteredCars = res;
        if (carFilter.brand !== '') {
          this.filteredCars = res.filter(
            (car) => car.Brand === carFilter.brand
          );
        }
      },
      error: (err) => {
        console.error('Error fetching filtered cars:', err);
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
  onSort() {
    if (this.sortOrder === 'default') {
      // No sorting needed, do nothing
    } else if (this.sortOrder === 'low') {
      this.filteredCars.sort((a, b) => a.PricePerDay - b.PricePerDay);
    } else if (this.sortOrder === 'high') {
      this.filteredCars.sort((a, b) => b.PricePerDay - a.PricePerDay);
    }
  }
}
