import { Component, Input, input } from '@angular/core';
import { Review } from '../../types/review';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.css'
})
export class ReviewCardComponent {
  @Input() review : Review = {
    reservationId: 0,
    carId: 0,
    userSsn: '',
    Message: '',
    Rate: 0
  };
  
    
}
