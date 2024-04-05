import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListcarComponent } from './platform/admin/components/listcar/listcar.component';
import { AddcarComponent } from './platform/admin/components/addcar/addcar.component';
import { EditcarComponent } from './platform/admin/components/editcar/editcar.component';
import { DeletecarComponent } from './platform/admin/components/deletecar/deletecar.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
