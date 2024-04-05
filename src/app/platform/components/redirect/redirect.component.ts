import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarRentingService } from '../../car-rental/services/car-renting.service';
import { Reservation } from '../../car-rental/types/reservation';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.css',
})
export class RedirectComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carRentingService: CarRentingService
  ) {}

  async ngOnInit(): Promise<void> {
    const success = this.route.snapshot.queryParamMap.get('success');

    if (success === 'true') {
      const reservation: Reservation =
        await this.carRentingService.getRentingData();
      console.log(reservation);
      this.carRentingService.addReservation(reservation).subscribe({
        next: (res) => {
          console.log('Reservation added:', res);
          this.carRentingService.clearRentingData();
          this.router.navigate(['/userprofile', 'my-orders'], {
            queryParams: { success: 'true' },
          });
        },
        complete: () => console.log('Reservation addition completed'),
        error: (error) => console.error('Error adding reservation:', error),
      });
    } else if (success === 'false') {
      // Navigate to my-orders page with failure query parameter
      this.router.navigate(['/userprofile', 'my-orders'], {
        queryParams: { success: 'false' },
      });
      // Clear renting data
      this.carRentingService.clearRentingData();
    }
  }
}
