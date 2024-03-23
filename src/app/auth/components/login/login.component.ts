import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../../types/login';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
        console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['']);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
