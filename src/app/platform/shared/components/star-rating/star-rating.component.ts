import { Component, Input, OnInit, input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent implements OnInit{
  @Input() rating:number =0;
  limit:number=5
  rounded=0;

  ngOnInit(): void {
    this.rounded = Math.round(this.rating);
  }
}
