import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from '../../../Car';
import { Observable, catchError, throwError } from 'rxjs';
import { prod } from '../../../prod';
import { jwtDecode } from 'jwt-decode';

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
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log('Headers:', headers); 
    return this.http.post<any>('https://localhost:44348/api/Cars', car, { headers }).pipe(
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
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log('Headers:', headers); 
    const url = `${this.apiUrl}/${carData.Id}`;
    return this.http.put<any>(url, carData ,{headers});
  }

  deleteCar(carId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log('Headers:', headers); 
    const url = `${this.apiUrl}/${carId}`;
    return this.http.delete(url,{headers});
  }
  getCarById(id: number): Observable<Car> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Car>(url);
  }
  getReservation(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log('Headers:', headers); 
    return this.http.get<any[]>('https://localhost:44348/api/Reservations',{headers});
  }
  deleteReseravtion(reservationId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log('Headers:', headers); 
    const url = `${'https://localhost:44348/api/Reservations'}/${reservationId}`;
    return this.http.delete(url ,{headers}) ;
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
