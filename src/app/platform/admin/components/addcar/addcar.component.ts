import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Car } from '../../../../Car';
import { CarentalServiceService } from '../../../../Services/carental-service.service';
import { Router } from '@angular/router';
import { prod } from '../../../../prod';

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrl: './addcar.component.css',
})
export class AddcarComponent {
  car: Car = {
    id: 0,
    name: '',
    brand: '',
    modelYear: '',
    description: '',
    color: '',
    category: '',
    seatCount: 0,
    pricePerDay: 0,
    images: '',
    hasAirCondition: false,
    isAutomatic: false,
  };
  errorMessages: string[] = [];

  constructor(
    private carService: CarentalServiceService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.carService.addCar(this.car).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (errors) => {
        if (Array.isArray(errors)) {
          this.errorMessages = errors.map((error: any) => error.errorMessage);
        } else {
          this.errorMessages = [errors];
        }
      },
    });
  }
}
