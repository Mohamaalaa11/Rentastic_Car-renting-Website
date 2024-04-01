import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { OrderCardComponent } from './my-orders/order-card/order-card.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [OrderCardComponent,MyOrdersComponent,ProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,SharedModule,FormsModule,ReactiveFormsModule
  ],exports:[MyOrdersComponent,OrderCardComponent,ProfileComponent]
})
export class UserModule { }
