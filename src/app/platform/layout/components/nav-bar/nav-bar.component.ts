import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  isAdmin = false;
  isLoggedIn = false;

  constructor(private authServices: AuthService, private route: Router) {}

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
      this.route.navigate(['auth', 'login']);
    }
    this.authServices.logout();
    this.authServices.isLoggedIn$.next(false);
  }
}
