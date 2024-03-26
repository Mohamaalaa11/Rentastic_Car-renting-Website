import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformRoutingModule } from './platform-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { NavBarComponent } from './layout/components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [LayoutComponent, NavBarComponent],
  imports: [CommonModule, PlatformRoutingModule],
})
export class PlatformModule {}
