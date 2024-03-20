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
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  login() {
    const MODEL: Login = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    };
    this.authService.login(MODEL).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/home/main']);
      },
      (error) => {}
    );
  }
}
