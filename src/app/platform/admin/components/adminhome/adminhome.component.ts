import { Component, OnInit } from '@angular/core';
import { CarentalServiceService } from '../../Services/carental-service.service';
import { Router } from '@angular/router';
import { Car } from '../../../../Car';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.css'
})
export class AdminhomeComponent implements OnInit {
  cars: any[] = [];
  displayedCars: any[] = [];
  showConfirmation = false;
  carToDelete: Car | null = null;
  constructor(private carService: CarentalServiceService, private router: Router) { }

  ngOnInit(): void {
    this.carService.getCars().subscribe({
      next: (cars) => {
        this.cars = cars;
        this.displayedCars = [...this.cars];
      },
      error: (error) => {
        console.error('Error fetching cars:', error);
      }
    });
  }

  openEditCar(car: any) {
    this.router.navigateByUrl(`/editcar/${car.Id}`);
  }
  showDeleteConfirmation(car: Car) {
    this.carToDelete = car;
    this.showConfirmation = true;
  }

  deleteCar(car: any) {
    this.carService.deleteCar(car.Id).subscribe(() => {
    
      this.showConfirmation = false;
    });
  }

  cancelDelete() {
    this.carToDelete = null;
    this.showConfirmation = false;
  }


 
}