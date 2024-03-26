import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  @Input() rating:number =0;
  limit:number=5
  rounded=Math.round(this.rating)
}
