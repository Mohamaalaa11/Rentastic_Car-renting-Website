import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
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

  getBrands(): Observable<string[]> {
    return this.getCars().pipe(
      map((cars: Car[]) => {
        const brandsSet = new Set<string>();
        cars.forEach((car) => brandsSet.add(car.Brand));
        return Array.from(brandsSet);
      })
    );
  }

  getFilterdCarsByDate(model: CarFilter): Observable<Car[]> {
    return this.http.post<Car[]>(
      'https://localhost:7283/api/Cars/AvailabeDate',
      model
    );
  }
}
