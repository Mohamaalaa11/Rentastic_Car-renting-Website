import { Component } from '@angular/core';
import { CarService } from '../../../services/car.service';
import { Car } from '../../../types/car';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.css',
})
export class CarCardComponent {
  cars: Car[] = [];

  constructor(private carService: CarService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.carService.getCar(id!).subscribe({
      next: (car) => {
        const carCategory = car.Category;

        this.carService.getCars().subscribe({
          next: (cars) => {
            const filteredCars = cars.filter((c) => {
              return c.Category === carCategory && c.Id !== Number(id); // Exclude car with the same ID
            });

            const slicedArray = filteredCars.slice(0, 3);
            this.cars = slicedArray;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
