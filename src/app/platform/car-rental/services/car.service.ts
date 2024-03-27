import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../types/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>('https://localhost:7283/api/Cars');
  }

  getCar(id: string): Observable<Car> {
    return this.http.get<Car>(`https://localhost:7283/api/Cars/${id}`);
  }
}
