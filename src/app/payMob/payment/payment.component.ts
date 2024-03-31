import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../constants';
import { Observable } from 'rxjs/internal/Observable';

import { catchError, map, of } from 'rxjs';
import { Order } from '../types/orderRequest';
import { PaymentData } from '../types/paymentData';
import { PayDataService } from '../../platform/car-rental/services/paydata.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constants = new Constants();
  authenticationToken!: string;
  orderId!: number;

  constructor(private http: HttpClient, private service: PayDataService) {}

  async ngOnInit() {
    // const token = await this.getAuthenticationToken();
    // this.createPaymentLink(token);
    // this.getPaymentKey();
    const paymentKey = this.service.paymentKey$;
    console.log(paymentKey);
  }

  // async getPaymentKey(amount: number) {
  //   this.authenticationToken = await this.getAuthenticationToken()
  //   this.orderId=await this.getOrderId(this.authenticationToken,(100*amount).toString());
  //     this.paymentKey=await this.getTheKey(this.authenticationToken,(100*amount).toString(),"EGP",this.orderId);
  //     window.location.href = "https://accept.paymob.com/api/acceptance/iframes/834418?payment_token="+this.paymentKey;
  // }

  // getAuthenticationToken() {
  // const requestBody = {
  //   api_key: this.constants.apikey
  // };

  //   this.http.post('https://accept.paymob.com/api/auth/tokens', JSON.stringify(requestBody), {
  //     headers: { 'Content-Type': 'application/json' }
  //   }) .subscribe({
  //       next: (response) => {
  //         console.log( response)

  //       },
  //       error: (error) => {
  //         console.error(error);
  //       }
  //     });
  // }

  // getOrderId(authenticationToken:string,amount:string){

  //   const requestBody = {
  //     auth_token	: authenticationToken,
  //     amount_cents	:amount,
  //     currency:"EGP",
  //     delivery_needed	:"false",
  //     items:[]

  //   };

  //   this.http.post("https://accept.paymob.com/api/ecommerce/orders" , JSON.stringify(requestBody), {
  //     headers: { 'Content-Type': 'application/json' }
  //   }) .subscribe({
  //       next: (response) => {
  //         console.log(response)

  //       },
  //       error: (error) => {
  //         console.error(error);
  //       }
  //     });}
  //     getTheKey(authenticationToken:string,amount:string,currency:string , orderId:string){
  //       const requestBody = {

  //           auth_token: authenticationToken,
  //           amount_cents: amount,
  //           expiration: 3600,
  //           order_id: orderId,
  //           billing_data: {
  //             apartment: "803",
  //             email: "claudette09@exa.com",
  //             floor: "42",
  //             first_name: "Clifford",
  //             street: "Ethan Land",
  //             building: "8028",
  //             phone_number: "+86(8)9135210487",
  //             shipping_method: "PKG",
  //             postal_code: "01898",
  //             city: "Jaskolskiburgh",
  //             country: "CR",
  //             last_name: "Nicolas",
  //             state: "Utah"
  //           },
  //           currency: "EGP",
  //           integration_id: this.constants.integrationId,
  //           lock_order_when_paid: "false"
  //         }
  //         this.http.post(' https://accept.paymob.com/api/acceptance/payment_keys', JSON.stringify(requestBody), {
  //           headers: { 'Content-Type': 'application/json' }
  //         }) .subscribe({
  //             next: (response) => {
  //               return response

  //             },
  //             error: (error) => {
  //               console.error(error);
  //             }
  //           })
  //       };

  async getAuthenticationToken() {
    const userData = {
      username: '01555003911',
      password: '01154576609@Ma',
    };

    const res: any = await this.http
      .post('https://accept.paymob.com/api/auth/tokens', userData)
      .toPromise();
    const resParsed = JSON.parse(JSON.stringify(res));
    return resParsed.token;
  }

  async createPaymentLink(token: string): Promise<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const paymentData = {
      payment_methods: ['4545163'],
      // integrations: ['4545163'],
      amount_cents: 1400,
      name: 'Mohamed Ashraf',
      email: 'mohamed.ashraf.abdelmounaim@gmail.com',
      phone_number: '+201555003911',
      is_live: 'false',
    };

    this.http
      .post(
        'https://accept.paymob.com/api/ecommerce/payment-links',
        paymentData,
        { headers }
      )
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // getPaymentKey() {
  //   // Get Auth Key
  //   const requestBody = {
  //     api_key: this.constants.apikey,
  //   };

  //   this.service.getAuthToken(requestBody).subscribe({
  //     next: async (res) => {
  //       const parsedRes = await JSON.parse(JSON.stringify(res));
  //       this.authenticationToken = parsedRes['token'];

  //       // Get Order ID
  //       const order: Order = {
  //         auth_token: this.authenticationToken,
  //         delivery_needed: 'false',
  //         amount_cents: '1400',
  //         currency: 'EGP',
  //         items: [],
  //       };

  //       const headers = new HttpHeaders({
  //         Authorization: `Bearer ${this.authenticationToken}`,
  //         'Content-Type': 'application/json',
  //       });

  //       console.log(order.auth_token);
  //       if (this.authenticationToken) {
  //         this.service.getOrderId(order, headers).subscribe({
  //           next: async (res) => {
  //             const parsedRes = await JSON.parse(JSON.stringify(res));
  //             this.orderId = parsedRes['id'];

  //             // Get Payment Key
  //             const paymentData: PaymentData = {
  //               expiration: 3600,

  //               auth_token: this.authenticationToken,
  //               integration_id: this.constants.integrationId,
  //               order_id: this.orderId.toString(),

  //               amount_cents: '1400',
  //               currency: 'EGP',

  //               billing_data: {
  //                 first_name: 'Clifford',
  //                 last_name: 'Nicolas',
  //                 email: 'claudette09@exa.com',
  //                 phone_number: '+86(8)9135210487',

  //                 apartment: 'NA',
  //                 floor: 'NA',
  //                 street: 'NA',
  //                 building: 'NA',
  //                 shipping_method: 'NA',
  //                 postal_code: 'NA',
  //                 city: 'NA',
  //                 country: 'NA',
  //                 state: 'NA',
  //               },

  //               lock_order_when_paid: 'false',
  //             };

  //             this.service.getPaymentKey(paymentData).subscribe({
  //               next: async (res) => {
  //                 const parsedRes = await JSON.parse(JSON.stringify(res));
  //                 this.paymentKey = parsedRes['token'];
  //                 console.log(`payment key  =  ${this.paymentKey}`);
  //               },
  //             });
  //           },
  //         });
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
}
