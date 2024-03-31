import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListcarComponent } from './platform/admin/components/listcar/listcar.component';
import { AddcarComponent } from './platform/admin/components/addcar/addcar.component';
import { EditcarComponent } from './platform/admin/components/editcar/editcar.component';
import { DeletecarComponent } from './platform/admin/components/deletecar/deletecar.component';
import { HeroComponent } from './platform/home/components/hero/hero.component';
import { AdminhomeComponent } from './platform/admin/components/adminhome/adminhome.component';
import { ReservationlistComponent } from './platform/admin/components/reservationlist/reservationlist.component';
import { PaymentComponent } from './payMob/payment/payment.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./platform/platform.module').then((m) => m.PlatformModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'payment',
    component: PaymentComponent,
  },
  // { path: '', component: AdminhomeComponent },
  // { path: 'addcar', component: AddcarComponent },
  // { path: 'editcar/:id', component: EditcarComponent },
  // { path: 'deletecar/:id', component: DeletecarComponent },
  // { path: 'home', component: AdminhomeComponent },
  // { path: 'car', component: ListcarComponent },
  // { path: 'reservation', component: ReservationlistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
