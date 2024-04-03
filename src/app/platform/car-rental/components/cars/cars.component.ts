import { Component, OnInit } from '@angular/core';
import { Car } from '../../types/car';
import { CarService } from '../../services/car.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CarFilter } from '../../types/car-filter';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  constructor(private carServices: CarService, private route: ActivatedRoute) {}

  cars: Car[] = [];
  filteredCars: Car[] = [];
  models: string[] = [];
  colors: string[] = [];
  carName: string = '';
  carModel = '';

  cars$: Observable<Car[]> = this.carServices.cars$;
  carBrand$: Observable<string[]> = this.carServices.carsBrand$;

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (params) => {
        if (
          params.get('brand') &&
          params.get('startYear') &&
          params.get('startMonth') &&
          params.get('startDay') &&
          params.get('endYear') &&
          params.get('endMonth') &&
          params.get('endMonth')
        ) {
          const carFilter: CarFilter = {
            brand: params.get('brand')!,
            startYear: params.get('startYear')!,
            startMonth: params.get('startMonth')!,
            startDay: params.get('startDay')!,
            endYear: params.get('endYear')!,
            endMonth: params.get('endMonth')!,
            endDay: params.get('endMonth')!,
          };

          this.getFilterdCars(carFilter);
        } else {
          this.getCars();
          this.carServices.getCarsBrand();
        }
      },
    });
  }

  getCars() {
    this.carServices.getCars().subscribe({
      next: (res) => {
        this.carServices.cars$.next(res);

        // this.cars = res;
        // console.log(res);
        // this.filteredCars = this.cars;
        // this.getModels();
        // this.getColors();
      },
    });
  }

  getFilterdCars(carFilter: CarFilter) {
    this.carServices.getFilterdCarsByDate(carFilter).subscribe({
      next: (res) => {
        let filterdCars = res;
        if (carFilter.brand !== '') {
          filterdCars = res.filter((car) => car.Brand === carFilter.brand);
        }
        this.carServices.cars$.next(filterdCars);
        console.log(res);
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

  onSort(event: Event) {
    let value = (event.target as HTMLInputElement).value;

    if (value === 'all') {
      this.getCars();
    }

    if (value === 'low') {
      this.filteredCars = this.cars.sort(
        // Ascending => 1, 2, 3
        (a, b) => a.PricePerDay - b.PricePerDay
      );
    } else if (value === 'high') {
      // Descending => 99, 98, 97
      this.filteredCars = this.cars.sort(
        (a, b) => b.PricePerDay - a.PricePerDay
      );
    }
  }
}
