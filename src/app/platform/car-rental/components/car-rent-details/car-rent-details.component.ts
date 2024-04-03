import { Component, OnInit } from '@angular/core';
import { Car } from '../../types/car';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { CarService } from '../../services/car.service';
import { CarRentingService } from '../../services/car-renting.service';
import { CarAvailability } from '../../types/carAvailability';

// Payment
import { PayDataService } from '../../services/paydata.service';
import { PaymentData } from '../../types/paymentData';
import { OrderData } from '../../types/orderData';

@Component({
  selector: 'app-car-rent-details',
  templateUrl: './car-rent-details.component.html',
  styleUrl: './car-rent-details.component.css',
})
export class CarRentDetailsComponent implements OnInit {
  car: Car | undefined;
  carAvailabilty: CarAvailability | undefined;
  endDate!: string;
  startDate!: String;
  error: any = { isError: false, errorMessage: 'dsad' };

  apiKey: string =
    'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RZM09EQTBMQ0p1WVcxbElqb2lNVGN4TVRnek5qVXlNaTR3TXpBME1ERWlmUS5OUndiNkZXZ2Mta0dzVk9Uc09ITWNDdzJQb1NONUdmenExTmhBS1ZNOU1CeVhQUXU5VDRVTXBpbjB1eWF2MEptREZaRi1KTGMyTi0zamRtcURDX2NIUQ==';
  integrationId: number = 4545163;
  authenticationToken!: string;
  orderId!: number;
  paymentKey!: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private carRentingService: CarRentingService,
    private payDataService: PayDataService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.startDate = new Date().toISOString();
    this.carService.getCar(id).subscribe({
      next: (res) => {
        this.car = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getStartDate(e: any) {
    this.startDate = this.setDate(e.value).toISOString();
  }

  rentForm = new FormGroup({
    startDate: new FormControl<Date>(new Date(), [
      Validators.required,
      this.startDateValidator(),
    ]),
    endDate: new FormControl<Date>(new Date(), [
      Validators.required,
      this.endDateValidator(),
    ]),
  });

  startDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const today = new Date().getTime();

      if (!(control && control.value)) {
        // if there's no control or no value, that's ok
        return null;
      }

      // return null if there's no errors
      return control.value.getTime() < today
        ? { invalidDate: 'You cannot use pervious dates' }
        : null;
    };
  }

  endDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let startDate = this.startDate;
      let returnDate = this.setDate(control.value).toISOString();
      if (!(control && control.value)) {
        // if there's no control or no value, that's ok
        return null;
      }

      // return null if there's no errors
      return returnDate < startDate
        ? { invalidDate: 'End date must be after pickup date' }
        : null;
    };
  }

  getEndDate(e: any) {
    this.endDate = this.setDate(e.value).toISOString();
    return this.endDate;
  }

  // endDateValidator(): boolean {
  //   if (this.rentForm.controls.startDate.value?.toISOString()! > this.endDate) {
  //     this.error = {
  //       isError: true,
  //       errorMessage: "End Date can't before start date",
  //     };
  //     return false; // There is an error
  //   }

  //   this.error = {
  //     isError: false,
  //     errorMessage: '',
  //   };
  //   return false; // No error
  // }

  //  Add 5 hrs to Date to solve problem of getting the day before
  setDate(date: Date) {
    let d = date;
    d.setHours(d.getHours() + 5);
    d.setMinutes(d.getMinutes() + 30);
    return new Date(d);
  }

  async onReserve() {
    // Car Id
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;

    if (!this.rentForm.invalid) {
      // form values
      this.carAvailabilty = {
        carId: id,
        startRentDate: this.setDate(
          this.rentForm.controls.startDate.value!
        ).toISOString(),
        endRentDate: this.setDate(
          this.rentForm.controls.endDate.value!
        ).toISOString(),
      };

      // check car availabilty in time wanted
      this.carRentingService
        .checkCarAvailability(this.carAvailabilty!)
        .subscribe({
          next: async (res) => {
            if (res !== true) {
              const requestBody = {
                api_key: this.apiKey,
              };

              this.payDataService.getAuthToken(requestBody).subscribe({
                next: (res) => {
                  const parsedRes = JSON.parse(JSON.stringify(res));
                  this.authenticationToken = parsedRes['token'];
                  console.log(this.authenticationToken);

                  // Get Order ID
                  const order: OrderData = {
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
                    this.payDataService.getOrderId(order, headers).subscribe({
                      next: async (res) => {
                        const parsedRes = await JSON.parse(JSON.stringify(res));
                        this.orderId = parsedRes['id'];

                        // Get Payment Key
                        const paymentData: PaymentData = {
                          expiration: 3600,

                          auth_token: this.authenticationToken,
                          integration_id: this.integrationId,
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

                        this.payDataService
                          .getPaymentKey(paymentData)
                          .subscribe({
                            next: async (res) => {
                              const parsedRes = await JSON.parse(
                                JSON.stringify(res)
                              );
                              this.paymentKey = parsedRes['token'];
                              this.payDataService.paymentKey$.next(
                                this.paymentKey
                              );
                              console.log(`payment key  =  ${this.paymentKey}`);
                              this.payDataService.paymentKey$.next(
                                this.paymentKey
                              );
                              // window.location.href = `https://accept.paymob.com/api/acceptance/iframes/834630?payment_token=${this.paymentKey}`;
                              this.router.navigate(['/payment']);
                            },
                          });
                      },
                    });
                  }
                },
                error: (err) => {
                  console.log(err);
                },
              });
            }
          },
          error: (err) => {},
        });
    }
  }

  async getPaymentKey() {
    // Get Auth Key
    const requestBody = {
      api_key: this.apiKey,
    };

    this.payDataService.getAuthToken(requestBody).subscribe({
      next: (res) => {
        const parsedRes = JSON.parse(JSON.stringify(res));
        this.authenticationToken = parsedRes['token'];
        console.log(this.authenticationToken);

        // Get Order ID
        const order: OrderData = {
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
          this.payDataService.getOrderId(order, headers).subscribe({
            next: async (res) => {
              const parsedRes = await JSON.parse(JSON.stringify(res));
              this.orderId = parsedRes['id'];

              // Get Payment Key
              const paymentData: PaymentData = {
                expiration: 3600,

                auth_token: this.authenticationToken,
                integration_id: this.integrationId,
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

              this.payDataService.getPaymentKey(paymentData).subscribe({
                next: async (res) => {
                  const parsedRes = await JSON.parse(JSON.stringify(res));
                  this.paymentKey = parsedRes['token'];
                  this.payDataService.paymentKey$.next(this.paymentKey);
                  console.log(`payment key  =  ${this.paymentKey}`);
                },
              });
            },
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
