import { Component, OnInit } from '@angular/core';
import { Car } from '../../types/car';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
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
import { ProfileService } from '../../../user/services/profile.service';
import { User } from '../../../user/Types/user';
import { AuthService } from '../../../../auth/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-car-rent-details',
  templateUrl: './car-rent-details.component.html',
  styleUrl: './car-rent-details.component.css',
  providers: [MessageService],
})
export class CarRentDetailsComponent implements OnInit {
  car: Car = {} as Car;
  user: User | undefined;
  carAvailabilty: CarAvailability | undefined;
  startDate!: String;
  endDate!: string;
  error: any = { isError: false, errorMessage: 'dsad' };
  total!: number;
  imgsrc: string = '../../../../../assets/imgs/img-placeholder.jpg';

  apiKey: string =
    'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RZM09EQTBMQ0p1WVcxbElqb2lNVGN4TVRnek5qVXlNaTR3TXpBME1ERWlmUS5OUndiNkZXZ2Mta0dzVk9Uc09ITWNDdzJQb1NONUdmenExTmhBS1ZNOU1CeVhQUXU5VDRVTXBpbjB1eWF2MEptREZaRi1KTGMyTi0zamRtcURDX2NIUQ==';
  integrationId: number = 4545163;
  authenticationToken!: string;
  orderId!: number;
  paymentKey!: string;
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private carRentingService: CarRentingService,
    private payDataService: PayDataService,
    private userService: ProfileService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  cars: Car[] = [];
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.startDate = new Date().toISOString();
    this.carService.getCar(id).subscribe({
      next: (res) => {
        if (res.Images !== '') {
          this.imgsrc = res.Images;
        }
        this.car = res;
      },
      error: (err) => {
        console.log(err);
        this.toastFailed('Error Fetching The Car');
      },
    });
    console.log(this.car.Reviews);
    this.isLoading = false;

    this.carService.getCar(id!).subscribe({
      next: (res) => {
        const carCategory = res.Category;
      },
    });
  }

  rentForm = new FormGroup(
    {
      startDate: new FormControl<Date>(new Date(), [
        Validators.required,
        this.startDateValidator(),
      ]),
      endDate: new FormControl<Date>(new Date(), [
        Validators.required,
        this.endDateValidator(),
      ]),
    },
    { validators: this.dateRangeValidator() }
  );

  //  Add 5 hrs to Date to solve problem of getting the day before
  setDate(date: Date) {
    let d = date;
    d.setHours(d.getHours() + 5);
    d.setMinutes(d.getMinutes() + 30);
    return new Date(d);
  }

  getStartDate(e: any) {
    this.startDate = this.setDate(e.value).toISOString();
    return this.startDate;
  }

  getEndDate(e: any) {
    this.endDate = this.setDate(e.value).toISOString();
    this.calcTotalPrice();
    return this.endDate;
  }

  // Validators
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
        return null;
      }
      // return null if there's no errors
      return returnDate < startDate
        ? { invalidDate: 'End date must be after pickup date' }
        : null;
    };
  }

  dateRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;

      const startDateControl = formGroup.get('startDate');
      const endDateControl = formGroup.get('endDate');

      if (!startDateControl || !endDateControl) {
        // If either start date or end date control is missing, return null (no error)
        return null;
      }

      const startDate = startDateControl.value;
      const endDate = endDateControl.value;

      if (startDate && endDate && startDate.getTime() > endDate.getTime()) {
        // If start date is after end date, return an error
        return { invalidDateRange: 'End date must be after the start date' };
      }

      const today = new Date().getTime();
      if (
        startDate &&
        endDate &&
        (startDate.getTime() < today || endDate.getTime() < today)
      ) {
        // If either start date or end date is before today, return an error
        return {
          invalidDate:
            'You cannot use previous dates for the start or end date',
        };
      }

      // If no errors, return null
      return null;
    };
  }

  // Reservaion Procces
  getDays(pickdt: Date, retdt: Date): number {
    return Math.floor(
      (retdt.getTime() - pickdt.getTime()) / (24 * 3600 * 1000)
    );
  }

  calcTotalPrice(): number {
    const price = this.car?.PricePerDay;
    const pickDate = new Date(this.startDate.toString());
    const returnDate = new Date(this.endDate.toString());

    const days = this.getDays(pickDate, returnDate);

    this.total = days * price!;

    return this.total;
  }

  onReserve() {
    // Car Id
    const id = this.activatedRoute.snapshot.paramMap.get('id')!;

    if (this.authService.isLoggedIn$.value) {
      if (!this.rentForm.invalid) {
        this.isLoading = true;

        const totalPrice = 100 * this.calcTotalPrice();
        // Form Values to Pass it to Api Call
        this.carAvailabilty = {
          carId: id,
          startRentDate: this.setDate(
            this.rentForm.controls.startDate.value!
          ).toISOString(),
          endRentDate: this.setDate(
            this.rentForm.controls.endDate.value!
          ).toISOString(),
        };

        console.log(this.car);

        // check car availabilty in time wanted
        this.carRentingService
          .checkCarAvailability(this.carAvailabilty!)
          .subscribe({
            next: (res) => {
              // if Return is False Continue the Renting
              if (res !== true) {
                // Api key Request to Get Auth Token
                const requestBody = {
                  api_key: this.apiKey,
                };

                this.payDataService.getAuthToken(requestBody).subscribe({
                  next: async (res) => {
                    const parsedRes = await JSON.parse(JSON.stringify(res));
                    this.authenticationToken = await parsedRes['token'];

                    // Order Data to Get Order ID
                    const order: OrderData = {
                      auth_token: this.authenticationToken,
                      delivery_needed: 'false',
                      amount_cents: totalPrice.toString(),
                      currency: 'EGP',
                      items: [
                        {
                          name: this.car?.Name,
                          amount_cents: totalPrice.toString(),
                          description: this.car?.Description,
                          quantity: '1',
                        },
                      ],
                    };

                    const headers = new HttpHeaders({
                      Authorization: `Bearer ${this.authenticationToken}`,
                      'Content-Type': 'application/json',
                    });

                    if (this.authenticationToken) {
                      //  Get User Data
                      this.userService.getUserData().subscribe({
                        next: (res) => {
                          this.user = res;
                          // Send Payment Data
                          this.payDataService
                            .getOrderId(order, headers)
                            .subscribe({
                              next: async (res) => {
                                const parsedRes = await JSON.parse(
                                  JSON.stringify(res)
                                );
                                this.orderId = await parsedRes['id'];

                                // Payment Request Date to  Get Payment Key
                                const paymentData: PaymentData = {
                                  expiration: 3600,

                                  auth_token: this.authenticationToken,
                                  order_id: this.orderId.toString(),
                                  integration_id: this.integrationId,

                                  amount_cents: totalPrice.toString(),
                                  currency: 'EGP',

                                  billing_data: {
                                    first_name: 'this',
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
                                      console.log(
                                        `payment key  =  ${this.paymentKey}`
                                      );
                                      this.payDataService.paymentKey$.next(
                                        this.paymentKey
                                      );

                                      // Save Data To Seecion Storage to use it after payment Success
                                      const userGuid: string =
                                        this.userService.getuserguidString();

                                      this.carRentingService.storeRentingData(
                                        userGuid,
                                        id,
                                        this.rentForm.controls.startDate.value!,
                                        this.rentForm.controls.endDate.value!,
                                        totalPrice.toString()
                                      );

                                      window.location.href = `https://accept.paymob.com/api/acceptance/iframes/834630?payment_token=${this.paymentKey}`;
                                    },
                                  });
                              },
                            });
                        },
                        error: (err) => {
                          console.log(err);
                        },
                      });
                    }
                  },
                  error: (err) => {
                    console.log(err);
                    this.toastFailed('Failed to start payment');
                  },
                });
              } else {
                this.toastFailed('That Date is not avaliable');
              }
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else {
        this.toastFailed('You Have To Provide a Valid Date Before Renting');
      }
    } else {
      this.router.navigate(['/auth', 'login']);
    }
  }

  // Toast Functions
  toastSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  toastFailed(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'error',
      detail: message,
    });
  }
}
