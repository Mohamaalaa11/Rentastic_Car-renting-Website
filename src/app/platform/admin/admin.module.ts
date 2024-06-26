import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListcarComponent } from './components/listcar/listcar.component';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { AddcarComponent } from './components/addcar/addcar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationlistComponent } from './components/reservationlist/reservationlist.component';
import { EditcarComponent } from './components/editcar/editcar.component';
import { DeletecarComponent } from './components/deletecar/deletecar.component';
import { DeleteConfirmationComponentComponent } from './components/delete-confirmation-component/delete-confirmation-component.component';
import { DletereservationComponent } from './components/dletereservation/dletereservation.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    ListcarComponent,
    AdminhomeComponent,
    AddcarComponent,
    ReservationlistComponent,
    EditcarComponent,
    DeletecarComponent,
    DeleteConfirmationComponentComponent,
    DletereservationComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
  ],
})
export class AdminModule {}
