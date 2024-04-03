import { Component, OnInit } from '@angular/core';
import { CarentalServiceService } from '../../Services/carental-service.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservationlist',
  templateUrl: './reservationlist.component.html',
  styleUrl: './reservationlist.component.css' ,
  providers: [DatePipe]
})
export class ReservationlistComponent implements OnInit {
  reservations: any[] = [];
  showConfirmation = false;
  reservationToDelete: any | null = null;
  fromDate: string = '';
  toDate: string = '';
  itemsPerPage = 10;
  currentPage = 1;
  selectedSortOrder: 'oldest' | 'newest'|'sort' = 'sort';

  
  

  constructor(
    private carservices: CarentalServiceService,
    private router: Router ,  private datePipe: DatePipe
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
    let filteredReservations = this.reservations;
  
    if (this.fromDate && this.toDate) {
      filteredReservations = filteredReservations.filter(reservation =>
        reservation.StartRentTime >= this.fromDate && reservation.EndRentDate <= this.toDate
      );
    }
    if (this.selectedSortOrder == 'sort'){
      filteredReservations = filteredReservations ;
    }
  
    else if (this.selectedSortOrder === 'oldest') {
      filteredReservations = filteredReservations.sort((a, b) =>
        new Date(a.StartRentTime).getTime() - new Date(b.StartRentTime).getTime()
      );
    } else if (this.selectedSortOrder === 'newest') {
      filteredReservations = filteredReservations.sort((a, b) =>
        new Date(b.StartRentTime).getTime() - new Date(a.StartRentTime).getTime()
      );
    }
  
    return filteredReservations.slice(this.startIndex, this.endIndex + 1);
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

  
 
  getCars() {
    this.carservices.getReservation().subscribe({
      next: (eventResult) => {
        this.reservations = eventResult;
        
        this.generatePages();
      },
      error: () => {},
    });
  }
  showDeleteConfirmation(reservation: any) {
    this. reservationToDelete = reservation;
    this.showConfirmation = true;
  }

  deletereservation(reservation: any) {
    this.carservices.deleteReseravtion(reservation.Id).subscribe(() => {
      this.reservations = this.reservations.filter((c) => c !== reservation);
      this.showConfirmation = false;
    });
  }

  cancelDelete() {
    this. reservationToDelete = null;
    this.showConfirmation = false;
  }
  
  applySort() {
    this.generatePages();
  }
  
 
}
