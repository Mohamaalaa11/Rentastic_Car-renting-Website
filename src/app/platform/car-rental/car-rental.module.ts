import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRentalRoutingModule } from './car-rental-routing.module';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { CarsComponent } from './components/cars/cars.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { CarRentDetailsComponent } from './components/car-rent-details/car-rent-details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [ReviewCardComponent, CarsComponent, CarRentDetailsComponent],
  imports: [
    CommonModule,
    CarRentalRoutingModule,
    HttpClientModule,
    SharedModule,MatDatepickerModule,MatInputModule,MatFormFieldModule,MatNativeDateModule
  ],
  exports:[
    CarRentDetailsComponent
  ]
})
export class CarRentalModule {}
