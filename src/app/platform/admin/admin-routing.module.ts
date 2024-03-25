import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { ReservationlistComponent } from './components/reservationlist/reservationlist.component';
import { ListcarComponent } from './components/listcar/listcar.component';

const routes: Routes = [
  { path: '', component: AdminhomeComponent },
  {
    path: 'reservations',
    component: ReservationlistComponent,
  },

  {
    path: 'cars',
    component: ListcarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
