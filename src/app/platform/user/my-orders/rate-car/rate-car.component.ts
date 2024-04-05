import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rate-car',
  templateUrl: './rate-car.component.html',
  styleUrls: ['./rate-car.component.css']
})
export class RateCarComponent {
  @Input() limit: number = 5;
  @Input() rounded: number = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  onStarHover(starIndex: number) {
    this.rounded = starIndex;
  }

  rate(rating: number) {
    this.rounded = rating;
    this.ratingChange.emit(rating);
  }
}
