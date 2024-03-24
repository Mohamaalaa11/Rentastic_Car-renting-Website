import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../Car';
import { Observable, catchError, throwError } from 'rxjs';
import { prod } from '../prod';

@Injectable({
  providedIn: 'root'
})
export class CarentalServiceService {

  private apiUrl = 'https://localhost:44348/api/Cars';
  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }
  
  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }
  editCar(carData: Car): Observable<Car> {
    const url = `${this.apiUrl}/${carData.id}`;
    return this.http.put<Car>(url, carData);
  }

  deleteCar(carId: number): Observable<any> {
    const url = `${this.apiUrl}/${carId}`;
    return this.http.delete(url);
  }
  getCarById(id: number): Observable<Car> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Car>(url);
  }
}
