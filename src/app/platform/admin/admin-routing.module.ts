import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { ReservationlistComponent } from './components/reservationlist/reservationlist.component';
import { ListcarComponent } from './components/listcar/listcar.component';
import { AddcarComponent } from './components/addcar/addcar.component';
import { EditcarComponent } from './components/editcar/editcar.component';
import { adminGuard } from '../../guards/admin.guard';


const routes: Routes = [
  { path: '', component: AdminhomeComponent, canActivate: [adminGuard] },
  {
    path: 'reservations',
    component: ReservationlistComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'cars',
    component: ListcarComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'add-car',
    component: AddcarComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'editcar/:Id',
    component: EditcarComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'editcar/:Id',
    component: EditcarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
