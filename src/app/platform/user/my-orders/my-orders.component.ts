import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { User } from '../Types/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'] // Change styleUrl to styleUrls
})
export class MyOrdersComponent implements OnInit {
  user: User = {} as User;

  constructor(private profileService: ProfileService,private router :Router) {}

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

  ngOnInit(): void {
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
