import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderCardComponent } from './my-orders/order-card/order-card.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [MyOrdersComponent, OrderCardComponent, ProfileComponent],
  imports: [CommonModule],
  exports: [],
})
export class UserModule {}
