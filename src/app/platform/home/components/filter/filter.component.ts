import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Car } from '../../../../Car';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CarRentDetailsComponent } from '../../../car-rental/components/car-rent-details/car-rent-details.component';
import { CarentalServiceService } from '../../../admin/Services/carental-service.service';
import { RouteReuseStrategy, Router } from '@angular/router';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  filteredCars: any[] = [];

  constructor(private carService: CarentalServiceService, private router: Router) {}

  form = new FormGroup({
    cartype: new FormControl<string>(''),
    startDate: new FormControl<Date>(new Date()),
    endDate: new FormControl<Date>(new Date())
  });

  cartypes: string[] = ["BMW", "Audi", "Nissan", "Lamborghini"];

  GetData() {
    const requestBody = {
      startYear: this.form.value.startDate!.getFullYear().toString(),
      startMonth: (this.form.value.startDate!.getMonth() + 1).toString(),
      startDay: this.form.value.startDate!.getDate().toString(),
      endYear: this.form.value.endDate!.getFullYear().toString(),
      endMonth: (this.form.value.endDate!.getMonth() + 1).toString(),
      endDay: this.form.value.endDate!.getDate().toString()
    };
  
    this.carService.getCarsAvailability(requestBody).subscribe(
      response => {
        console.log(response);
        this.filteredCars = response;
  
        if (this.form.value.cartype !== '') {
          this.filteredCars = this.filteredCars.filter(car => car.Brand === this.form.value.cartype);
        }
        this.router.navigate(['/filtered-cars'], { state: { filteredCars: this.filteredCars } });
      },
      error => {
        console.error(error);
      }
    );
  }
}  