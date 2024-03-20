import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Register } from '../../types/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private authServices: AuthService, private router: Router) {}

  registerForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    phoneNumber: new FormControl<string>('', [Validators.required]),
    idNumber: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  register() {
    const model: Register = {
      name: this.registerForm.value.username!,
      email: this.registerForm.value.email!,
      phoneNumber: this.registerForm.value.phoneNumber!,
      // idNumber: this.registerForm.value.idNumber!,
      password: this.registerForm.value.password!,
      image: '',
      address: 'saddsdddddddddddddd',
    };

    this.authServices.register(model).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err.message);
      },
    });

    // console.log(model);
    // console.log(this.registerForm.value);
  }
}
