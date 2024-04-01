import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../../../Car';
import { Observable, catchError, throwError } from 'rxjs';
import { prod } from '../../../prod';

@Injectable({
  providedIn: 'root',
})
export class CarentalServiceService {
  private apiUrl = 'https://localhost:44348/api/Cars';
  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  addCar(car: Car): Observable<any> {
    return this.http.post<any>('https://localhost:44348/api/Cars', car).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400 && error.error.errors) {
          return throwError(error.error.errors);
        } else {
          return throwError('An unknown error occurred.');
        }
      })
    );
  }


  editCar(carData: any): Observable<any> {
    const url = `${this.apiUrl}/${carData.Id}`;
    return this.http.put<any>(url, carData);
  }

  deleteCar(carId: number): Observable<any> {
    const url = `${this.apiUrl}/${carId}`;
    return this.http.delete(url);
  }
  getCarById(id: number): Observable<Car> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Car>(url);
  }
  getCarsAvailability(requestBody: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>('https://localhost:44348/api/Cars/AvailabeDate', JSON.stringify(requestBody), httpOptions);
  }
}
