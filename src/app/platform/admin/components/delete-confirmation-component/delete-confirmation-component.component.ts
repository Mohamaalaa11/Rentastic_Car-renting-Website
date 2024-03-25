import { Component, EventEmitter, Output } from '@angular/core';
import { CarentalServiceService } from '../../../../Services/carental-service.service';
import { Car } from '../../../../Car';

@Component({
  selector: 'app-delete-confirmation-component',
  templateUrl: './delete-confirmation-component.component.html',
  styleUrl: './delete-confirmation-component.component.css',
})
export class DeleteConfirmationComponentComponent {
  @Output() deleteCar = new EventEmitter<void>();
  @Output() cancelDelete = new EventEmitter<void>();
}
