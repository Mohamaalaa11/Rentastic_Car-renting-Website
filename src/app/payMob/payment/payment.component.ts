import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../constants';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  constants = new Constants();
  authenticationToken: any;
  paymentKey:any;
  orderId: any;
  constructor(private http: HttpClient) {}

  async getPaymentKey(amount: number) {
    this.authenticationToken = await this.getAuthenticationToken()
    this.orderId=await this.getOrderId(this.authenticationToken,(100*amount).toString());
      this.paymentKey=await this.getTheKey(this.authenticationToken,(100*amount).toString(),"EGP",this.orderId);
      window.location.href = "https://accept.paymob.com/api/acceptance/iframes/834418?payment_token="+this.paymentKey;
  }

  getAuthenticationToken() {
    const requestBody = {
      api_key: this.constants.apikey 
    };

    this.http.post('https://accept.paymob.com/api/auth/tokens', JSON.stringify(requestBody), {
      headers: { 'Content-Type': 'application/json' }
    }) .subscribe({
        next: (response) => {
          console.log( response)

        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  getOrderId(authenticationToken:string,amount:string){
  
    const requestBody = {
      auth_token	: authenticationToken,
      amount_cents	:amount,
      currency:"EGP",
      delivery_needed	:"false",
      items:[]

    };

    this.http.post("https://accept.paymob.com/api/ecommerce/orders" , JSON.stringify(requestBody), {
      headers: { 'Content-Type': 'application/json' }
    }) .subscribe({
        next: (response) => {
          console.log(response)

        },
        error: (error) => {
          console.error(error);
        }
      });}
      getTheKey(authenticationToken:string,amount:string,currency:string , orderId:string){
        const requestBody = {
          
            auth_token: authenticationToken,
            amount_cents: amount, 
            expiration: 3600, 
            order_id: orderId,
            billing_data: {
              apartment: "803", 
              email: "claudette09@exa.com", 
              floor: "42", 
              first_name: "Clifford", 
              street: "Ethan Land", 
              building: "8028", 
              phone_number: "+86(8)9135210487", 
              shipping_method: "PKG", 
              postal_code: "01898", 
              city: "Jaskolskiburgh", 
              country: "CR", 
              last_name: "Nicolas", 
              state: "Utah"
            }, 
            currency: "EGP", 
            integration_id: this.constants.integrationId,
            lock_order_when_paid: "false"
          }
          this.http.post(' https://accept.paymob.com/api/acceptance/payment_keys', JSON.stringify(requestBody), {
            headers: { 'Content-Type': 'application/json' }
          }) .subscribe({
              next: (response) => {
                return response
      
              },
              error: (error) => {
                console.error(error);
              }
            })
        };



}
  

