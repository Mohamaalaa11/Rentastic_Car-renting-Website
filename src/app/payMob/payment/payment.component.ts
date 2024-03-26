import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../constants';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constants = new Constants();
  authenticationToken: any;
  paymentKey: any;
  orderId: any;
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    // const token = await this.getAuthenticationToken();
    // this.createPaymentLink(token);
  }

  // async getPaymentKey(amount: number) {
  //   this.authenticationToken = await this.getAuthenticationToken()
  //   this.orderId=await this.getOrderId(this.authenticationToken,(100*amount).toString());
  //     this.paymentKey=await this.getTheKey(this.authenticationToken,(100*amount).toString(),"EGP",this.orderId);
  //     window.location.href = "https://accept.paymob.com/api/acceptance/iframes/834418?payment_token="+this.paymentKey;
  // }

  // getAuthenticationToken() {
  //   const requestBody = {
  //     api_key: this.constants.apikey
  //   };

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

  async getPaymentKey(amount: number, currency: string) {
    // this.authenticationToken = await this.getAuthentcationKey();
  }
}
