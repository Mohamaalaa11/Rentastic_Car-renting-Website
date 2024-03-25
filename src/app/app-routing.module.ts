import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListcarComponent } from './Components/Admin/listcar/listcar.component';
import { AddcarComponent } from './Components/Admin/addcar/addcar.component';
import { EditcarComponent } from './Components/Admin/editcar/editcar.component';
import { DeletecarComponent } from './Components/Admin/deletecar/deletecar.component';
import { HeroComponent } from './platform/home/components/hero/hero.component';
import { AdminhomeComponent } from './Components/Admin/adminhome/adminhome.component';
import { ReservationlistComponent } from './Components/Admin/reservationlist/reservationlist.component';

const routes: Routes = [
 // {
   // path: '',
   // loadChildren: () =>
    //  import('./platform/platform.module').then((m) => m.PlatformModule),
  //},
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '', component: AdminhomeComponent },
  { path: 'addcar', component: AddcarComponent },
  { path: 'editcar/:id', component: EditcarComponent},
  { path: 'deletecar/:id', component: DeletecarComponent },
  { path: 'home', component: AdminhomeComponent },
  { path: 'car', component: ListcarComponent },
  {path:'reservation', component : ReservationlistComponent}

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
