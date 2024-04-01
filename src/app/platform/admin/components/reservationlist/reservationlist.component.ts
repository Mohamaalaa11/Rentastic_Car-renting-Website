import { Component, OnInit } from '@angular/core';
import { CarentalServiceService } from '../../Services/carental-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservationlist',
  templateUrl: './reservationlist.component.html',
  styleUrl: './reservationlist.component.css'
})
export class ReservationlistComponent implements OnInit {
  reservations: any[] = [];
  showConfirmation = false;
  carToDelete: any | null = null;
 
  itemsPerPage = 10;
  currentPage = 1;
  

  constructor(
    private carservices: CarentalServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carservices.getCars().subscribe({
      next: (eventResult) => {
        this.reservations = eventResult;
        this.generatePages();

        this.getCars();
      },
      error: () => {},
    });
  }

  pages: number[] = [];

  get totalItems(): number {
    return this.reservations.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return Math.min(
      this.startIndex + this.itemsPerPage - 1,
      this.totalItems - 1
    );
  }

  get displayedreservation(): any[] {
    return this.reservations
      
      .slice(this.startIndex, this.endIndex + 1);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  generatePages() {
    const filteredCarsLength = this.reservations.length;
    this.pages = [];
    const totalPages = Math.ceil(filteredCarsLength / this.itemsPerPage);
    for (let i = 1; i <= totalPages; i++) {
      this.pages.push(i);
    }
  }

  // generatePages() {
  //   this.pages = [];
  //   for (let i = 1; i <= this.totalPages; i++) {
  //     this.pages.push(i);
  //   }
  // }

 
  getCars() {
    this.carservices.getReservation().subscribe({
      next: (eventResult) => {
        this.reservations = eventResult;
        
        this.generatePages();
      },
      error: () => {},
    });
  }
  showDeleteConfirmation(car: any) {
    this.carToDelete = car;
    this.showConfirmation = true;
  }

  deleteCar(reservation: any) {
    this.carservices.deleteReseravtion(reservation.Id).subscribe(() => {
      this.reservations = this.reservations.filter((c) => c !== reservation);
      this.showConfirmation = false;
    });
  }

  cancelDelete() {
    this.carToDelete = null;
    this.showConfirmation = false;
  }

 
}
