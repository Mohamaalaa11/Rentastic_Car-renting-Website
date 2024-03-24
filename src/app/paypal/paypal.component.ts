import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css'] // Corrected property name and value
})
export class PaypalComponent implements OnInit {
  ngOnInit() {
    render({
      id: "#myPayPalButtons",
      value: "100",
      currency: "USD",
      onApprove: (details) => {
        alert("Transaction Finished");
      }
    });
  }
}
