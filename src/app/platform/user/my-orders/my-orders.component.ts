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

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  popupSucces: boolean = false;
  popupratesuccess : boolean=false;
  deletepopup : boolean=false;
  popupratefail : boolean=false;
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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const success = this.route.snapshot.queryParamMap.get('success');
    if (success === 'true') {
      this.popupSucces = true;
    } else if (success === 'false') {
      this.popupSucces = false;
    }

    this.getuserguid();
    this.getUser();
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
      console.log('User GUID:', this.userguid);
    }
  }

  getUser() {
    this.profileService.getUserData().subscribe({
      next: (res: User) => {
        this.user = res;
        console.log(this.user);
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });
  }
  onsubmitRating(carId: number, Id: number) {
    const model: Review = {
      reservationId: Id,
      carId: carId,
      userGuid: this.userguid,
      message: this.rateform.value.message!,
      rate: this.rateform.value.rating!,
    };

    console.log(model);
    this.profileService.addReview(model).subscribe({
      next: () => {
        this.popupratesuccess=true;
      },
      error: (err) => {
        this.popupratefail=true;
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
        this.deletepopup=true
      },
      error: (err) => {
        console.error('Error deleting reservation:', err);
      },
    });
  }
}