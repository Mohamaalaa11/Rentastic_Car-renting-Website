import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformRoutingModule } from './platform-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { NavBarComponent } from './layout/components/nav-bar/nav-bar.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';

@NgModule({
  declarations: [LayoutComponent, NavBarComponent, RedirectComponent, ErrorPageComponent],
  imports: [CommonModule, PlatformRoutingModule, SharedModule],
})
export class PlatformModule {}
