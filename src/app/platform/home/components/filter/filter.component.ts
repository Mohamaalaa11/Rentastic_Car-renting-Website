import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Car } from '../../../../Car';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CarRentDetailsComponent } from '../../../car-rental/components/car-rent-details/car-rent-details.component';
import { CarentalServiceService } from '../../../admin/Services/carental-service.service';
import { RouteReuseStrategy, Router } from '@angular/router';
import { CarService } from '../../../car-rental/services/car.service';
import { Observable } from 'rxjs';
import { CarFilter } from '../../../car-rental/types/car-filter';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [MessageService],
})
export class FilterComponent implements OnInit {
  brands: string[] = [];
  startDate!: String;
  endDate!: string;

  constructor(
    private router: Router,
    private carServices: CarService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.startDate = new Date().toISOString();

    this.carServices.getBrands().subscribe({
      next: (res) => {
        this.brands = res;
      },
    });
  }

  form = new FormGroup(
    {
      carBrand: new FormControl<string>(''),
      startDate: new FormControl<Date>(new Date(), [Validators.required]),
      endDate: new FormControl<Date>(new Date(), [Validators.required]),
    },
    { validators: this.dateRangeValidator() }
  );

  onFilterByDate() {
    const startDate: Date = new Date(this.form.value.startDate!);
    const endDate: Date = new Date(this.form.value.endDate!);

    const queryParams: CarFilter = {
      brand: this.form.controls.carBrand.value!,
      startYear: startDate!.getFullYear().toString(),
      startMonth: (startDate!.getMonth() + 1).toString(),
      startDay: startDate!.getDate().toString(),
      endYear: endDate!.getFullYear().toString(),
      endMonth: (endDate!.getMonth() + 1).toString(),
      endDay: endDate!.getDate().toString(),
    };

    if (!this.form.invalid) {
      this.router.navigate(['/car-rental', 'cars'], {
        queryParams: queryParams,
      });
    } else {
      this.toastFailed('Please choose both pick-up date and return date');
    }

    return false;
  }

  // Validators
  startDateValidator(): ValidatorFn {
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

  endDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let startDate = this.startDate;
      let returnDate = this.setDate(control.value).toISOString();
      if (!(control && control.value)) {
        return null;
      }
      // return null if there's no errors
      return returnDate < startDate
        ? { invalidDate: 'End date must be after pickup date' }
        : null;
    };
  }

  dateRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;

      const startDateControl = formGroup.get('startDate');
      const endDateControl = formGroup.get('endDate');

      if (!startDateControl || !endDateControl) {
        // If either start date or end date control is missing, return null (no error)
        return null;
      }

      const startDate = startDateControl.value;
      const endDate = endDateControl.value;

      if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
        // If start date is after end date, return an error
        return { invalidDateRange: 'End date must be after the start date' };
      }

      const today = new Date().getTime();
      if (
        startDate &&
        endDate &&
        (startDate.getTime() < today || endDate.getTime() < today)
      ) {
        // If either start date or end date is before today, return an error
        return {
          invalidDate:
            'You cannot use previous dates for the start or end date',
        };
      }

      // If no errors, return null
      return null;
    };
  }

  // Date Validtors Helper
  //  Add 5 hrs to Date to solve problem of getting the day before
  setDate(date: Date) {
    let d = date;
    d.setHours(d.getHours() + 5);
    d.setMinutes(d.getMinutes() + 30);
    return new Date(d);
  }

  getStartDate(e: any) {
    this.startDate = this.setDate(e.value).toISOString();
    return this.startDate;
  }

  getEndDate(e: any) {
    this.endDate = this.setDate(e.value).toISOString();
    return this.endDate;
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
