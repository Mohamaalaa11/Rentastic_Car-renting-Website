import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { User } from '../Types/user';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RateCarComponent } from './rate-car/rate-car.component';
import { Review } from '../Types/review';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'] // Change styleUrl to styleUrls
})
export class MyOrdersComponent implements OnInit {
  user: User = {} as User;
  token= localStorage.getItem('token'); 
  userguid: string = '';
    showErrorToast: boolean = false;
  rateform = new FormGroup({
    rating: new FormControl<number>(0, [Validators.required]),
    message: new FormControl<string>('', [Validators.required])
  });
  constructor(private profileService: ProfileService,private router :Router) {}
  getuserguid() {
    if (this.token) {
        const decodedToken = jwtDecode(localStorage.getItem('token')!);
        console.log('Decoded Token:', decodedToken); // Add this line
        const parsedToken = JSON.parse(JSON.stringify(decodedToken));
        this.userguid =
            parsedToken[
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
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
      }
    });
  }
  onsubmitRating(carId: number, Id: number) {
    const model:Review = {
      reservationId: Id,
      carId: carId,
      userGuid: this.userguid,
      message: this.rateform.value.message!,
      rate: this.rateform.value.rating!
    };
    this.profileService.addReview(model).subscribe({
      next: () => {
        console.log("Review added Successfully !");
      },
      error: (err) => {
        this.showErrorToast = true;
        this.showErrorToastForDuration()
      }
    });
  }
  showErrorToastForDuration() {
    setTimeout(() => {
      this.showErrorToast = false; // Hide toast after 5 seconds
    }, 5000); // 5000 milliseconds = 5 seconds
  }

  ngOnInit(): void {
    this.getuserguid();
    this.getUser();
   }

  isEndDatePassed(endDate: Date): boolean {
    const currentDate = new Date();
    const end = new Date(endDate)
    return end.toISOString() > currentDate.toISOString();
  }

  OnDelete(id: number) {
    console.log(id)
    this.profileService.deleteReservation(id).subscribe({
      next: () => {
        this.router.navigate(['/userprofile','my-orders'])},
      error: (err) => {
        console.error('Error deleting reservation:', err);
      }
    });
  }
  
  
}
