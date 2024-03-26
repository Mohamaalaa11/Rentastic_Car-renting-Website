import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRentalRoutingModule } from './car-rental-routing.module';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { CarsComponent } from './components/cars/cars.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { CarRentDetailsComponent } from './components/car-rent-details/car-rent-details.component';

@NgModule({
  declarations: [ReviewCardComponent, CarsComponent, CarRentDetailsComponent],
  imports: [
    CommonModule,
    CarRentalRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  exports:[
    CarRentDetailsComponent
  ]
})
export class CarRentalModule {}
