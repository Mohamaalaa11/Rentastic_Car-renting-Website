import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './components/main/main.component';
import { HeroComponent } from './components/hero/hero.component';
import { FilterComponent } from './components/filter/filter.component';
import { SiteInfoComponent } from './components/site-info/site-info.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainComponent,
    HeroComponent,
    FilterComponent,
    SiteInfoComponent,
  ],
  imports: [CommonModule, HomeRoutingModule,MatNativeDateModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,FormsModule,ReactiveFormsModule],
})
export class HomeModule {}
