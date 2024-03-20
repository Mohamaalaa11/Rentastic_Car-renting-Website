import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRentalRoutingModule } from './car-rental-routing.module';
import { ReviewCardComponent } from './components/review-card/review-card.component';

@NgModule({
  declarations: [
    ReviewCardComponent
  ],
  imports: [CommonModule, CarRentalRoutingModule],
})
export class CarRentalModule {}
