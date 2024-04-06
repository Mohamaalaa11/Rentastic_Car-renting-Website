import { Component, OnInit } from '@angular/core';
import { Car } from '../../types/car';
import { CarService } from '../../services/car.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarFilter } from '../../types/car-filter';

import { CarRentingService } from '../../services/car-renting.service';
import { Reservation } from '../../types/reservation';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
  providers: [MessageService],
})
export class CarsComponent implements OnInit {
  constructor(
    private carServices: CarService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  cars: Car[] = [];
  filteredCars: Car[] = [];
  brands: string[] = [];
  colors: string[] = [];
  categories: string[] = [];
  // Filter
  selectedBrands: { [key: string]: boolean } = {};
  selectedColors: { [key: string]: boolean } = {};
  selectedCategories: { [key: string]: boolean } = {};
  priceFrom!: number | null;
  priceTo!: number | null;
  // Sorting
  sortOrder: string = 'default';
  // For Search
  carName: string = '';
  carModel: string = '';
  // No cars
  isCarsAvaliable: boolean = false;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // Fetch filtered cars based on query parameters
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
        this.getFilteredCarsByDate(carFilter);
        this.isLoading = false;
      } else {
        this.getCars(); // Fetch all cars
      }
    });

    this.carServices.getBrands().subscribe({
      next: (res) => {
        this.brands = res;
        this.isLoading = false;
      },
    });

    this.carServices.getColors().subscribe({
      next: (res) => {
        this.colors = res;
      },
    });

    this.carServices.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
    });
  }

  getCars() {
    this.carServices.getCars().subscribe({
      next: (res) => {
        this.isCarsAvaliable = true;
        this.cars = res;
        this.filteredCars = this.cars;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getFilteredCarsByDate(carFilter: CarFilter) {
    this.carServices.getFilterdCarsByDate(carFilter).subscribe({
      next: (res) => {
        this.cars = res;

        // Apply brand filter only if the brand is specified
        if (carFilter.brand !== '') {
          this.filteredCars = this.cars.filter(
            (car) => car.Brand === carFilter.brand
          );
          this.isCarsAvaliable = true;
          console.log(this.filteredCars);
        }
      },
      error: (err) => {
        console.error('Error fetching filtered cars:', err);
      },
    });
  }

  filter() {
    // Get selected brands
    const selectedBrandNames = Object.keys(this.selectedBrands).filter(
      (brand) => this.selectedBrands[brand]
    );

    // Get selected colors
    const selectedColors = Object.keys(this.selectedColors).filter(
      (color) => this.selectedColors[color]
    );

    // Get selected categories
    const selectedCategories = Object.keys(this.selectedCategories).filter(
      (category) => this.selectedCategories[category]
    );

    // Apply brand filter
    if (selectedBrandNames.length > 0) {
      this.filteredCars = this.cars.filter((car) =>
        selectedBrandNames.includes(car.Brand)
      );
    } else {
      this.filteredCars = this.cars.slice(); // If no brands selected, show all cars
    }

    // Apply color filter
    if (selectedColors.length > 0) {
      this.filteredCars = this.filteredCars.filter((car) =>
        selectedColors.includes(car.Color)
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      this.filteredCars = this.filteredCars.filter((car) =>
        selectedCategories.includes(car.Category)
      );
    }

    // Apply price filter
    if (
      this.priceFrom !== null &&
      this.priceTo !== null &&
      this.priceFrom !== undefined &&
      this.priceTo !== undefined
    ) {
      // Filter cars within the specified range
      this.filteredCars = this.filteredCars.filter(
        (car) =>
          car.PricePerDay >= this.priceFrom! && car.PricePerDay <= this.priceTo!
      );

      this.sortOrder = 'low';
      this.onSort();
    } else if (this.priceFrom !== null && this.priceFrom !== undefined) {
      // Filter cars starting from the specified price
      this.filteredCars = this.filteredCars.filter(
        (car) => car.PricePerDay >= this.priceFrom!
      );
      this.sortOrder = 'low';
      this.onSort();
    } else {
      this.sortOrder = 'default';
    }
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
      this.getCars();
    }
  }

  onSort() {
    if (this.sortOrder === 'default') {
      this.getCars();
      this.selectedBrands = {};
      this.selectedCategories = {};
      this.selectedColors = {};
      this.carModel = '';
      this.carName = '';
      this.priceFrom = null;
      this.priceTo = null;
    } else if (this.sortOrder === 'low') {
      this.filteredCars.sort((a, b) => a.PricePerDay - b.PricePerDay);
    } else if (this.sortOrder === 'high') {
      this.filteredCars.sort((a, b) => b.PricePerDay - a.PricePerDay);
    }
  }

  // Toast Functions
  toastSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  toastFailed(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'error',
      detail: message,
    });
  }
}
