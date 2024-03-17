import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { HeroComponent } from './home/hero/hero.component';
import { FilterComponent } from './home/filter/filter.component';
import { SiteInfoComponent } from './home/site-info/site-info.component';
import { CardComponent } from './Components/card/card.component';
import { LoginComponent } from './auth/components/login/login.component';
import { MyOrdersComponent } from './user/my-orders/my-orders.component';
import { ProfileComponent } from './user/profile/profile.component';
import { OrderCardComponent } from './user/my-orders/order-card/order-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    HeroComponent,
    FilterComponent,
    SiteInfoComponent,
    CardComponent,
    LoginComponent,ProfileComponent,MyOrdersComponent,OrderCardComponent
    
  ],
  imports: [BrowserModule, AppRoutingModule,],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
