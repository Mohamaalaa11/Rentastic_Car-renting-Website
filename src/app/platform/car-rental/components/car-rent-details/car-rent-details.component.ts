import { Component, OnInit } from '@angular/core';
import { Car } from '../../types/car';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../services/car.service';
@Component({
  selector: 'app-car-rent-details',
  templateUrl: './car-rent-details.component.html',
  styleUrl: './car-rent-details.component.css',
})
export class CarRentDetailsComponent implements OnInit {
  car: Car | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.carService.getCar(id).subscribe({
      next: (res) => {
        this.car = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onReserve() {
    throw new Error('Method not implemented.');
  }
  rentForm = new FormGroup({
    startDate: new FormControl<Date>(new Date(), [
      Validators.required,
      this.dateValidator(),
    ]),
    endDate: new FormControl<Date>(new Date(), [Validators.required]),
  });

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const today = new Date().getTime();

      if (!(control && control.value)) {
        // if there's no control or no value, that's ok
        return null;
      }

      // return null if there's no errors
      return control.value.getTime() < today
        ? { invalidDate: 'You cannot use pervious dates' }
        : null;
    };
  }
}
