import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

import { ListcarComponent } from './platform/admin/components/listcar/listcar.component';
import { AddcarComponent } from './platform/admin/components/addcar/addcar.component';
import { EditcarComponent } from './platform/admin/components/editcar/editcar.component';
import { DeletecarComponent } from './platform/admin/components/deletecar/deletecar.component';
import { DeleteConfirmationComponentComponent } from './platform/admin/components/delete-confirmation-component/delete-confirmation-component.component';
import { AdminhomeComponent } from './platform/admin/components/adminhome/adminhome.component';
import { ReservationlistComponent } from './platform/admin/components/reservationlist/reservationlist.component';
import { MatSelectModule } from '@angular/material/select';
import { PaymentComponent } from './payMob/payment/payment.component';
import { PaypalComponent } from './paypal/paypal.component';
import { SharedModule } from './platform/shared/shared.module';
import { CarRentalModule } from './platform/car-rental/car-rental.module';

@NgModule({
  declarations: [
    AppComponent,
    PaymentComponent,
    PaypalComponent,

    EditcarComponent,
    DeletecarComponent,
    DeleteConfirmationComponentComponent,
    ReservationlistComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    SharedModule,
    CarRentalModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
