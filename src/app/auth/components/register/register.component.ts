import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Register } from '../../types/register';
import { min } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  constructor(private authServices: AuthService, private router: Router) {}

  errors: string = '';
  isLoading = false;

  ngOnInit(): void {
    this.isLoading = false;
  }

  registerForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/^(012|011|015|010)\d{8}$/),
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    idNumber: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(
        '^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$'
      ),
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  register() {
    const model: Register = {
      name: this.registerForm.value.name!,
      email: this.registerForm.value.email!,
      phoneNumber: this.registerForm.value.phoneNumber!,
      password: this.registerForm.value.password!,
      nationalIdentityNumber: this.registerForm.value.idNumber!,
      image: '',
      address: '',
    };

    this.isLoading = true;

    this.authServices.register(model).subscribe({
      next: (res) => {
        const query = {
          register: 'success',
        };
        this.router.navigate(['auth', 'login'], { queryParams: query });
      },
      error: (err) => {
        console.log(err.error);
        this.errors = err.error;
        this.isLoading = false;
      },
    });

    // console.log(model);
    // console.log(this.registerForm.value);
  }
}
