import { Component, Input } from '@angular/core';
import { Car } from '../../../car-rental/types/car';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() car?: Car;
}
