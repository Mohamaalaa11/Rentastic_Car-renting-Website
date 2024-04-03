import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarAvailability } from '../types/carAvailability';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarRentingService {
  constructor(private http: HttpClient) {}

  checkCarAvailability(model: CarAvailability): Observable<boolean> {
    return this.http.post<boolean>(
      'https://localhost:7283/api/Cars/checkReserved',
      model
    );
  }
}
