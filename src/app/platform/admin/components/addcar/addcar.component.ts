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
  car: any = {
    Id: 0,
    Name: '',
    Brand: '',
    ModelYear: '',
    Description: '',
    Color: '',
    Category: '',
    SeatCount: 0,
    PricePerDay: 0,
    Images: '',
    HasAirCondition: false,
    IsAutomatic: false,
  };
  carForm: FormGroup;
  errorMessages: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarentalServiceService,
    private router: Router
  ) {
    this.carForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Brand: ['', Validators.required],
      ModelYear: [
        '',
        [
          Validators.required,
          Validators.pattern('^(19[0-9]{2}|20[0-1][0-9]|202[0-5])$'),
        ],
      ],
      Color: ['', Validators.required],
      Category: ['', Validators.required],
      Description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      SeatCount: ['', [Validators.required, Validators.pattern(/^(2|4|6)$/)]],
      PricePerDay: ['', [Validators.required, Validators.min(0.01)]],
      HasAirCondition: [false, Validators.required],
      IsAutomatic: [false, Validators.required],
      Images: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      this.carService.addCar(this.carForm.value).subscribe({
        next: () => {
          this.router.navigate(['', 'admin', 'cars']);
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
