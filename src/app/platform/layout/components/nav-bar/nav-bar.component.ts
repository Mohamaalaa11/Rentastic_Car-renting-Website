import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  isAdmin = false;
  isLoggedIn = false;

  constructor(
    private authServices: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authServices.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.authServices.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  onLoggedOut() {
    if (localStorage.getItem('role') === 'Admin') {
      this.router.navigate(['auth', 'login']);
    }

    let activeUrl = this.router.routerState.snapshot['url'];

    if (
      activeUrl === '/userprofile/profile' ||
      activeUrl === '/userprofile/my-orders'
    ) {
      this.router.navigate(['']);
    }

    this.authServices.logout();
    this.authServices.isLoggedIn$.next(false);
  }
}
