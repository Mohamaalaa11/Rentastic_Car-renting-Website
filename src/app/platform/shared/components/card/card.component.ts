import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../../../car-rental/types/car';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input({}) car?: Car;
  avgRate: number = 0;

  imgSrc = '../../../../../assets/imgs/img-placeholder.jpg';

  ngOnInit(): void {
    if (this.car?.Images === '') {
      this.car.Images = this.imgSrc;
    } else {
      this.imgSrc = this.car?.Images!;
    }

    if (this.car && this.car.Reviews && this.car.Reviews.length > 0) {
      const totalRatings = this.car.Reviews.reduce(
        (sum, review) => sum + review.Rate,
        0
      );
      this.avgRate = totalRatings / this.car.Reviews.length;
    }
  }
}
