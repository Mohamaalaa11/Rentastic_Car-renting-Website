import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../types/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(model: Login) {
    return this.http.post('https://fakestoreapi.com/auth/login', model);
  }
}
