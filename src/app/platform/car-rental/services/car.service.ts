import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Car } from '../types/car';
import { CarFilter } from '../types/car-filter';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  cars$ = new BehaviorSubject<Car[]>([]);
  carsBrand$ = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>('https://localhost:7283/api/Cars');
  }

  getCar(id: string): Observable<Car> {
    return this.http.get<Car>(`https://localhost:7283/api/Cars/${id}`);
  }

  getCarsBrand() {
    this.getCars().subscribe({
      next: (res) => {
        const cars: Car[] = res;
        const carsBrand: string[] = Array.from(
          new Set(cars.map((car) => car.Brand))
        );
        this.carsBrand$.next(carsBrand);
      },
    });
  }

  getFilterdCarsByDate(model: CarFilter): Observable<Car[]> {
    return this.http.post<Car[]>(
      'https://localhost:7283/api/Cars/AvailabeDate',
      model
    );
  }
}
