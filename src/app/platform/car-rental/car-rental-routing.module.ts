import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './components/cars/cars.component';
import { CarRentDetailsComponent } from './components/car-rent-details/car-rent-details.component';

const routes: Routes = [
  {
    path: 'cars',
    component: CarsComponent,
  },
  {
    path: 'car-details/:id',
    component: CarRentDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarRentalRoutingModule {}
