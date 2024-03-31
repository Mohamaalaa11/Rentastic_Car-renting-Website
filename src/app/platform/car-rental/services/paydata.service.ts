import { Injectable, model } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderData } from '../types/orderData';
import { PaymentData } from '../types/paymentData';

@Injectable({
  providedIn: 'root',
})
export class PayDataService {
  public paymentKey$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  getAuthToken(apikey: object): Observable<object> {
    return this.http.post<object>(
      'https://accept.paymob.com/api/auth/tokens',
      apikey,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  getOrderId(model: OrderData, headers: HttpHeaders) {
    return this.http.post(
      'https://accept.paymob.com/api/ecommerce/orders',
      model,
      {
        headers: headers,
      }
    );
  }

  getPaymentKey(model: PaymentData) {
    return this.http.post(
      'https://accept.paymob.com/api/acceptance/payment_keys',
      model
    );
  }
}
