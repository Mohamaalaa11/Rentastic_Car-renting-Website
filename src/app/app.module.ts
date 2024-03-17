import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { HeroComponent } from './Home/hero/hero.component';
import { FilterComponent } from './Home/filter/filter.component';
import { SiteInfoComponent } from './Home/site-info/site-info.component';
import { CardComponent } from './Components/card/card.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    HeroComponent,
    FilterComponent,
    SiteInfoComponent,
    CardComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
