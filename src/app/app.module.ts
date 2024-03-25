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

import { ListcarComponent } from './Components/Admin/listcar/listcar.component';
import { AddcarComponent } from './Components/Admin/addcar/addcar.component';
import { EditcarComponent } from './Components/Admin/editcar/editcar.component';
import { DeletecarComponent } from './Components/Admin/deletecar/deletecar.component';
import { DeleteConfirmationComponentComponent } from './Components/Admin/delete-confirmation-component/delete-confirmation-component.component';
import { AdminhomeComponent } from './Components/Admin/adminhome/adminhome.component';
import { ReservationlistComponent } from './Components/Admin/reservationlist/reservationlist.component';
import {MatSelectModule} from '@angular/material/select';
import { PaymentComponent } from './payMob/payment/payment.component';
import { PaypalComponent } from './paypal/paypal.component';

@NgModule({
  declarations: [AppComponent, PaymentComponent, PaypalComponent ,ListcarComponent, AdminhomeComponent,AddcarComponent, EditcarComponent, DeletecarComponent, DeleteConfirmationComponentComponent, AdminhomeComponent, ReservationlistComponent],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,MatDatepickerModule,MatInputModule,MatFormFieldModule,MatNativeDateModule,MatSelectModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
