import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../../../../Car';
import { CarentalServiceService } from '../../../../Services/carental-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-editcar',
  templateUrl: './editcar.component.html',
  styleUrl: './editcar.component.css',
  providers: [CurrencyPipe],
})
export class EditcarComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private carService: CarentalServiceService,
    private currencyPipe: CurrencyPipe,
    private router: Router
  ) {}

  getFormattedPrice(price: number): { amount: string; currency: string } {
    const formattedPrice =
      this.currencyPipe.transform(price, 'EGP', 'symbol', '1.0-0') || '';
    const parts = formattedPrice.split(' ');
    return {
      amount: parts[1],
      currency: 'EGP',
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const carId = +params['id'];
      this.carService.getCarById(carId).subscribe((car) => {
        this.car = car;
      });
    });
  }
  car: Car = new Car(0, '', '', '', '', '', '', 0, 0, '', false, false);

  onSubmit() {
    this.carService.editCar(this.car).subscribe({
      next: () => {
        console.log('Car edited successfully');
        this.router.navigateByUrl('/car');
      },
      error: () => {
        console.log('Failed to edit car');
      },
    });
  }

  onDelete() {
    this.showDeleteConfirmation = true;
  }
  showDeleteConfirmation = false;

  onDeleteConfirmed() {
    this.carService.deleteCar(this.car.id).subscribe({
      next: () => {
        console.log('Car deleted successfully');
        this.router.navigateByUrl('/car');
      },
      error: () => {
        console.log('Failed to delete car');
      },
    });
    this.closeModal();
  }

  closeModal() {
    this.showDeleteConfirmation = false;
  }
}
