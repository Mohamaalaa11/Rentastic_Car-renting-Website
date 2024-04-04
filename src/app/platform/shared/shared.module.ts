import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { StatusToasterComponent } from './components/status-toaster/status-toaster.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CardComponent,
    ErrorPageComponent,
    StarRatingComponent,
    SpinnerComponent,
    StatusToasterComponent,
  ],
  imports: [CommonModule, SharedRoutingModule],
  exports: [
    HeaderComponent,
    CardComponent,
    ErrorPageComponent,
    StarRatingComponent,
    SpinnerComponent,
    StatusToasterComponent,
  ],
})
export class SharedModule {}
