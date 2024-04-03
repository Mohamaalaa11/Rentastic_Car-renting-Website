import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Car } from '../../../../Car';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CarRentDetailsComponent } from '../../../car-rental/components/car-rent-details/car-rent-details.component';
import { CarentalServiceService } from '../../../admin/Services/carental-service.service';
import { RouteReuseStrategy, Router } from '@angular/router';
import { CarService } from '../../../car-rental/services/car.service';
import { Observable } from 'rxjs';
import { CarFilter } from '../../../car-rental/types/car-filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  brands: string[] = [];

  constructor(private router: Router, private carServices: CarService) {}

  ngOnInit(): void {
    this.carServices.getBrands().subscribe({
      next: (res) => {
        this.brands = res;
      },
    });
  }

  form = new FormGroup({
    carBrand: new FormControl<string>(''),
    startDate: new FormControl<Date>(new Date()),
    endDate: new FormControl<Date>(new Date()),
  });

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

    this.router.navigate(['/car-rental', 'cars'], { queryParams: queryParams });

    return false;
  }

  // GetData() {
  //   const requestBody = {
  //     startYear: this.form.value.startDate!.getFullYear().toString(),
  //     startMonth: (this.form.value.startDate!.getMonth() + 1).toString(),
  //     startDay: this.form.value.startDate!.getDate().toString(),
  //     endYear: this.form.value.endDate!.getFullYear().toString(),
  //     endMonth: (this.form.value.endDate!.getMonth() + 1).toString(),
  //     endDay: this.form.value.endDate!.getDate().toString(),
  //   };

  //   this.carService.getCarsAvailability(requestBody).subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.filteredCars = response;

  //       if (this.form.value.cartype !== '') {
  //         this.filteredCars = this.filteredCars.filter(
  //           (car) => car.Brand === this.form.value.cartype
  //         );
  //       }
  //       this.router.navigate(['/filtered-cars'], {
  //         state: { filteredCars: this.filteredCars },
  //       });
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }
}
