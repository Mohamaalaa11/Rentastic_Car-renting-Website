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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardsSliderComponent } from './components/cards-slider/cards-slider.component';
import { ToastModule } from 'primeng/toast';
import { CarCardComponent } from './components/car-rent-details/car-card/car-card.component';

@NgModule({
  declarations: [
    ReviewCardComponent,
    CarsComponent,
    CarRentDetailsComponent,
    CardsSliderComponent,
    CarCardComponent,
  ],
  imports: [
    CommonModule,
    CarRentalRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ToastModule,
  ],
  exports: [CarRentDetailsComponent],
})
export class CarRentalModule {}
