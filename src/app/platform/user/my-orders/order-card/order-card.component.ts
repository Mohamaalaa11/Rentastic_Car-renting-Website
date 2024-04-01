import { Component } from '@angular/core';
import { Reservation } from '../../../../Reservation';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css',
})
export class OrderCardComponent {
  reservations: Reservation[] = [
    {
      car: {
        Id: 1,
        Name: 'Nissan',
        Brand: 'Sunny',
        ModelYear: '2022',
        Description:
          'Lörem ipsum neskade nölingar ronar emedan pogon huruvida vittneslitteratur. Polyk obel, manera innan antenat.',
        Color: 'silver',
        Category: 'Luxury',
        SeatCount: 4,
        PricePerDay: 250,
        Images: '../../assets/imgs/gr.png',
        HasAirCondition: true,
        IsAutomatic: true,
      },
      customerId: 2,
      startDate: new Date(2023, 11, 15),
      endDate: new Date(2022, 11, 15),
      totalPrice: 1500,
    },
    {
      car: {
        Id: 1,
        Name: 'Nissan',
        Brand: 'Sunny',
        ModelYear: '2022',
        Description:
          'Lörem ipsum neskade nölingar ronar emedan pogon huruvida vittneslitteratur. Polyk obel, manera innan antenat.',
        Color: 'silver',
        Category: 'Luxury',
        SeatCount: 4,
        PricePerDay: 250,
        Images: '../../assets/imgs/gr.png',
        HasAirCondition: true,
        IsAutomatic: true,
      },
      customerId: 2,
      startDate: new Date(2023, 11, 15),
      endDate: new Date(2022, 11, 15),
      totalPrice: 1500,
    },
  ];
}
