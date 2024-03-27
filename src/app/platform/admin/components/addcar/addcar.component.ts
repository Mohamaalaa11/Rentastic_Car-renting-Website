import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Car } from '../../../../Car';
import { CarentalServiceService } from '../../Services/carental-service.service';
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
  carForm: FormGroup;
  errorMessages: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarentalServiceService,
    private router: Router
  ) {
    this.carForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      modelYear: [
        '',
        [Validators.required, Validators.pattern('^(1999|20[0-1][0-9]|2025)$')],
      ],
      color: ['', Validators.required],
      category: ['', Validators.required],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      seatCount: ['', [Validators.required, Validators.pattern(/^(2|4|6)$/)]],
      pricePerDay: ['', [Validators.required, Validators.min(0.01)]],
      hasAirCondition: [false, Validators.required],
      isAutomatic: [false, Validators.required],
      images: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      this.carService.addCar(this.carForm.value).subscribe({
        next: () => {
          this.router.navigate(['', 'admin', 'car']);
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
}
