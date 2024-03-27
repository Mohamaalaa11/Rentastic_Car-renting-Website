import { Component } from '@angular/core';
import { Car } from '../../types/car';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-car-rent-details',
  templateUrl: './car-rent-details.component.html',
  styleUrl: './car-rent-details.component.css',
})
export class CarRentDetailsComponent {
  onReserve() {
    throw new Error('Method not implemented.');
  }
  rentForm = new FormGroup({
    startDate: new FormControl<Date>(new Date(), [
      Validators.required,
      this.dateValidator,
    ]),
    endDate: new FormControl<Date>(new Date(), [Validators.required]),
  });

  car: Car = {
    id: 1,
    name: 'Sunny',
    brand: 'Nissan',
    modelYear: '2022',
    description:
      'Lörem ipsum neskade nölingar ronar emedan pogon huruvida vittneslitteratur. Polyk obel, manera innan antenat.',
    color: 'silver',
    category: 'Luxury',
    seatCount: 4,
    pricePerDay: 250,
    images: '../../assets/imgs/car1.png',
    hasAirCondition: true,
    isAutomatic: true,
  };

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const today = new Date().getTime();

      if (!(control && control.value)) {
        // if there's no control or no value, that's ok
        return null;
      }

      // return null if there's no errors
      return control.value.getTime() < today
        ? { invalidDate: 'You cannot use future dates' }
        : null;
    };
  }
}
