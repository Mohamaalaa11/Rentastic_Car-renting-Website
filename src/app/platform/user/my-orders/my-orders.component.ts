import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ProfileService } from '../services/profile.service';
import { User } from '../Types/user';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RateCarComponent } from './rate-car/rate-car.component';
import { Review } from '../Types/review';
import { jwtDecode } from 'jwt-decode';
// import { Reservation } from '../../../Reservation';
import { Reservation } from '../Types/reservations';

import { CarRentingService } from '../../car-rental/services/car-renting.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  providers: [MessageService],
})
export class MyOrdersComponent implements OnInit {
  popupSucces: boolean = false;
  popupratesuccess: boolean = false;
  deletepopup: boolean = false;
  popupratefail: boolean = false;
  selectedReservationId: number | null = null;

  user: User = {} as User;
  token = localStorage.getItem('token');
  userguid: string = '';
  showErrorToast: boolean = false;
  rateform = new FormGroup({
    rating: new FormControl<number>(0, [Validators.required]),
    message: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getuserguid();
    this.getUser();
  }

  ngAfterViewInit(): void {
    // Result of Payment
    const success = this.route.snapshot.queryParamMap.get('success');
    if (success === 'true') {
      this.toastSuccess(
        'Your payment is succeful you can now check your orders'
      );
    } else if (success === 'false') {
      this.toastFailed('Your payment failed please try again later');
    } else {
    }
  }

  getuserguid() {
    if (this.token) {
      const decodedToken = jwtDecode(localStorage.getItem('token')!);
      console.log('Decoded Token:', decodedToken); // Add this line
      const parsedToken = JSON.parse(JSON.stringify(decodedToken));
      this.userguid =
        parsedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ];
    }
  }

  getUser() {
    this.profileService.getUserData().subscribe({
      next: (res: User) => {
        this.user = res;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        this.toastFailed('Error fetching user data');
      },
    });
  }

  onsubmitRating(carId: number, Id: number) {
    const model: Review = {
      ReservationId: Id,
      CarId: carId,
      UserGuid: this.userguid,
      Message: this.rateform.value.message!,
      Rate: this.rateform.value.rating!,
    };

    console.log(model);
    this.profileService.addReview(model).subscribe({
      next: (res) => {
        this.toastSuccess(
          'Your Rate Added succefully Thanks For Renting With Rentastic'
        );

        console.log(res);
      },
      error: (err) => {
        this.toastFailed(
          'You Cant add review twice You already added review for this reservation before'
        );
        console.log(err);
      },
    });
  }

  isEndDatePassed(endDate: Date): boolean {
    const currentDate = new Date();
    const end = new Date(endDate);
    return end.toISOString() > currentDate.toISOString();
  }

  OnDelete(reservationId: number) {
    console.log('Deleting reservation with ID:', reservationId);
    this.profileService.deleteReservation(reservationId).subscribe({
      next: () => {
        this.router.navigate(['/userprofile', 'my-orders']);
        this.toastSuccess('Reservation deleted successfully  ');
      },
      error: (err) => {
        console.error('Error deleting reservation:', err);
        this.toastFailed(`Error deleting reservation: ${err}`);
      },
    });
  }

  // Toast Functions
  toastSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  toastFailed(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'error',
      detail: message,
    });
  }
}
