import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dletereservation',
  templateUrl: './dletereservation.component.html',
  styleUrl: './dletereservation.component.css'
})
export class DletereservationComponent {
  @Output() deleteCar = new EventEmitter<void>();
  @Output() cancelDelete = new EventEmitter<void>();
}
