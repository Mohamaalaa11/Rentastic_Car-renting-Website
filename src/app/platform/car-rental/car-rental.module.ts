import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRentalRoutingModule } from './car-rental-routing.module';
import { ReviewCardComponent } from './components/review-card/review-card.component';
import { CarsComponent } from './components/cars/cars.component';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from '../../Components/card/card.component';

@NgModule({
  declarations: [ReviewCardComponent, CarsComponent, CardComponent],
  imports: [CommonModule, CarRentalRoutingModule, SharedModule],
})
export class CarRentalModule {}
