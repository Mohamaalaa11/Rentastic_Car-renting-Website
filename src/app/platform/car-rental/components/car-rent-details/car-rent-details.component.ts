import { Component } from '@angular/core';
import { Car } from '../../types/car';
@Component({
  selector: 'app-car-rent-details',
  templateUrl: './car-rent-details.component.html',
  styleUrl: './car-rent-details.component.css'
})
export class CarRentDetailsComponent {
  car: Car={
    id: 1,
    name: 'Nissan',
    brand: 'Sunny',
    modelYear: '2022',
    description: '',
    color: 'silver',
    category: 'Luxury',
    seatCount: 4,
    pricePerDay: 250,
    images: '../../assets/imgs/car1.png',
    hasAirCondition: true,
    isAutomatic: true,
  }
}