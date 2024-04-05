import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarAvailability } from '../types/carAvailability';
import { Observable } from 'rxjs';
import { Reservation } from '../types/reservation';

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

  addReservation(model: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(
      'https://localhost:7283/api/Reservations',
      model
    );
  }

  storeRentingData(
    userGuid: string,
    carId: string,
    startRentTime: Date,
    endRentDate: Date,
    totalPrice: string
  ) {
    const rentingData = {
      userGuid: userGuid,
      carId: Number(carId),
      startRentTime: startRentTime.toISOString(),
      endRentDate: endRentDate.toISOString(),
      totalPrice: Number(totalPrice) / 100,
    };
    sessionStorage.setItem('rentingData', JSON.stringify(rentingData));

    console.log(rentingData);
  }

  getRentingData() {
    const rentingDataString = sessionStorage.getItem('rentingData');
    return JSON.parse(rentingDataString!);
  }

  clearRentingData() {
    sessionStorage.removeItem('rentingData');
  }
}
