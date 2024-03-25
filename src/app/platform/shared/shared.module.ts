import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [HeaderComponent, CardComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [HeaderComponent, CardComponent],
})
export class SharedModule {}
