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

  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  login() {
    const model: Login = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };

    this.authService.login(model).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        const token = jwtDecode(localStorage.getItem('token')!);
        const decodedToken = JSON.parse(JSON.stringify(token));
        const role =
          decodedToken[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ];

        if (role === 'Admin') {
          this.router.navigate(['auth', 'register']);
        } else if (role === 'User') {
          this.router.navigate(['']);
        }
      },

      error: (err) => {
        console.log(err);
        console.log(model);
      },
    });
  }
}
