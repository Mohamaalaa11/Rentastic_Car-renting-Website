import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Car } from '../../../../Car';
import { CarentalServiceService } from '../../Services/carental-service.service';
import { Router } from '@angular/router';
import { prod } from '../../../../prod';

@Component({
  selector: 'app-listcar',
  templateUrl: './listcar.component.html',
  styleUrl: './listcar.component.css',
})
export class ListcarComponent implements OnInit {
  cars: Car[] = [];
  showConfirmation = false;
  carToDelete: Car | null = null;
  filteredCars: Car[] = [];
  searchTerm = '';
  searchCategory: string = '';
  itemsPerPage = 10;
  currentPage = 1;

  constructor(
    private carservices: CarentalServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carservices.getCars().subscribe({
      next: (eventResult) => {
        this.cars = eventResult;
        this.generatePages();

        this.getCars();
      },
      error: () => {},
    });
  }

  pages: number[] = [];

  get totalItems(): number {
    return this.cars.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return Math.min(
      this.startIndex + this.itemsPerPage - 1,
      this.totalItems - 1
    );
  }

  get displayedCars(): any[] {
    return this.cars
      .filter((car) =>
        car.name.toLowerCase().includes(this.searchCategory.toLowerCase())
      )
      .slice(this.startIndex, this.endIndex + 1);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  generatePages() {
    const filteredCarsLength = this.cars.filter((car) =>
      car.name.toLowerCase().includes(this.searchCategory.toLowerCase())
    ).length;
    this.pages = [];
    const totalPages = Math.ceil(filteredCarsLength / this.itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
      this.pages.push(i);
    }
  }

  // generatePages() {
  //   this.pages = [];
  //   for (let i = 1; i <= this.totalPages; i++) {
  //     this.pages.push(i);
  //   }
  // }

  addCar() {
    this.router.navigate(['admin', 'add-car']);
  }
  openEditCar(car: Car) {
    this.router.navigateByUrl(`/editcar/${car.id}`);
  }

  editCar(carId: number) {
    this.router.navigateByUrl(`/editcar/${carId}`);
  }
  getCars() {
    this.carservices.getCars().subscribe({
      next: (eventResult) => {
        this.cars = eventResult;
        this.filteredCars = [...this.cars];
        this.generatePages();
      },
      error: () => {},
    });
  }
  showDeleteConfirmation(car: Car) {
    this.carToDelete = car;
    this.showConfirmation = true;
  }

  deleteCar(car: Car) {
    this.carservices.deleteCar(car.id).subscribe(() => {
      this.cars = this.cars.filter((c) => c !== car);
      this.showConfirmation = false;
    });
  }

  cancelDelete() {
    this.carToDelete = null;
    this.showConfirmation = false;
  }

  filterCars(): Car[] {
    return this.cars.filter((car) =>
      car.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
