import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../types/login';
import { Register } from '../types/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(model: Login) {
    return this.http.post('https://localhost:7283/api/Account/login', model);
  }

  register(model: Register) {
    return this.http.post('https://localhost:7283/api/Account/register', model);
  }
}
