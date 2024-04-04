import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent implements OnInit {
  popupSucces: boolean = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const success = this.route.snapshot.queryParamMap.get('success');
    if (success === 'true') {
      this.popupSucces = true;
    } else if (success === 'false') {
      this.popupSucces = false;
    }
  }
}
