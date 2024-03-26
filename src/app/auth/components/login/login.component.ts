import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../types/login';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  errors: string = '';

  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),

    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  onLogin() {
    const model: Login = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };

    this.authService.login(model).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);

        // Decode Token and pasre it to from (JSON) string into an object.
        const decodedToken = jwtDecode(localStorage.getItem('token')!);
        const parsedToken = JSON.parse(JSON.stringify(decodedToken));
        const role =
          parsedToken[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ];

        // Check Roles to direct
        if (role === 'Admin') {
          this.router.navigate(['admin']);
          this.authService.isAdmin$.next(true);
        } else if (role === 'User') {
          this.router.navigate(['']);
        }
        localStorage.setItem('role', role);
        this.authService.isLoggedIn$.next(true);
      },

      error: (err) => {
        this.errors = err.error;
        console.log(err.error);
      },
    });
  }
}
