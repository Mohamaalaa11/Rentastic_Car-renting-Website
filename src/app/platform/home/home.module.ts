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
import {MatSelectModule} from '@angular/material/select';
import { CardComponent } from '../shared/components/card/card.component';
import { HowItWorkComponent } from './components/how-it-work/how-it-work.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MainComponent,
    HeroComponent,
    FilterComponent,
    SiteInfoComponent,CardComponent, HowItWorkComponent
  ],
  imports: [CommonModule, SharedModule,HomeRoutingModule,MatNativeDateModule,MatSelectModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,FormsModule,ReactiveFormsModule],
})
export class HomeModule {}
