import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './components/main/main.component';
import { HeroComponent } from './components/hero/hero.component';
import { FilterComponent } from './components/filter/filter.component';
import { SiteInfoComponent } from './components/site-info/site-info.component';

@NgModule({
  declarations: [
    MainComponent,
    HeroComponent,
    FilterComponent,
    SiteInfoComponent,
  ],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
