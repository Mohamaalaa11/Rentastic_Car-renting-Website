import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListcarComponent } from './components/listcar/listcar.component';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { AddcarComponent } from './components/addcar/addcar.component';
import { AppRoutingModule } from '../../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListcarComponent, AdminhomeComponent, AddcarComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AdminModule {}
