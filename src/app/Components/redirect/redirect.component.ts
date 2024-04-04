import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.css',
})
export class RedirectComponent implements OnInit {
  constructor(private route: ActivatedRoute, private rotuer: Router) {}

  ngOnInit(): void {
    const success = this.route.snapshot.queryParamMap.get('success');

    if (success === 'true') {
      this.rotuer.navigate(['/userprofile', 'my-orders'], {
        queryParams: { success: true },
      });
    } else if (success === 'false') {
    }
  }
}
