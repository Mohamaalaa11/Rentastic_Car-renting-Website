import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `
  <div>
    <app-listcar (addCarClick)="toggleAddCarForm()"></app-listcar>
  </div>
  
  <app-addcar *ngIf="showAddCarForm"></app-addcar>
`
})
export class AppComponent {
  title = 'Rentastic-webApp';
  showAddCarForm: boolean = false;

  toggleAddCarForm() {
    this.showAddCarForm = !this.showAddCarForm;
  }
}
