import { Injectable, model } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../../constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../../types/orderRequest';
import { PaymentData } from '../../types/paymentData';

@Injectable({
  providedIn: 'root',
})
export class PayDataService {
  constants: any;
  service: any;
  authenticationToken: any;
  orderId: any;
  paymentKey: any;
  // public paymentKey$ = new BehaviorSubject<string>('');

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

  getOrderId(model: Order, headers: HttpHeaders) {
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

  getKey() {
    // Get Auth Key
    const requestBody = {
      api_key:
        'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RZM09EQTBMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuU00taVFXUUxiNF94UnU1MG9xcW13Y29HTHFBNU9FR2RkYzZ0SWxuYWREQUVWNWFhdlBWNk1ZTWNERk9Pa0lpNG9MX2YxYzc5QldXNy1rdFl4SXhnOXc=',
    };

    this.service.getAuthToken(requestBody).subscribe({
      next: async (res: any) => {
        const parsedRes = await JSON.parse(JSON.stringify(res));
        this.authenticationToken = parsedRes['token'];

        // Get Order ID
        const order: Order = {
          auth_token: this.authenticationToken,
          delivery_needed: 'false',
          amount_cents: '1400',
          currency: 'EGP',
          items: [],
        };

        const headers = new HttpHeaders({
          Authorization: `Bearer ${this.authenticationToken}`,
          'Content-Type': 'application/json',
        });

        console.log(order.auth_token);
        if (this.authenticationToken) {
          this.service.getOrderId(order, headers).subscribe({
            next: async (res: any) => {
              const parsedRes = await JSON.parse(JSON.stringify(res));
              this.orderId = parsedRes['id'];

              // Get Payment Key
              const paymentData: PaymentData = {
                expiration: 3600,

                auth_token: this.authenticationToken,
                integration_id: this.constants.integrationId,
                order_id: this.orderId.toString(),

                amount_cents: '1400',
                currency: 'EGP',

                billing_data: {
                  first_name: 'Clifford',
                  last_name: 'Nicolas',
                  email: 'claudette09@exa.com',
                  phone_number: '+86(8)9135210487',

                  apartment: 'NA',
                  floor: 'NA',
                  street: 'NA',
                  building: 'NA',
                  shipping_method: 'NA',
                  postal_code: 'NA',
                  city: 'NA',
                  country: 'NA',
                  state: 'NA',
                },

                lock_order_when_paid: 'false',
              };

              this.service.getPaymentKey(paymentData).subscribe({
                next: async (res: any) => {
                  const parsedRes = await JSON.parse(JSON.stringify(res));
                  this.paymentKey = parsedRes['token'];
                  console.log(`payment key  =  ${this.paymentKey}`);
                },
              });
            },
          });
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
