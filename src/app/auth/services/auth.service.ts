import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../types/login';
import { Register } from '../types/register';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAdmin$ = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(model: Login) {
    return this.http.post('https://localhost:44348/api/Account/login', model);
  }

  register(model: Register) {

    return this.http.post(
      'https://localhost:7283/api/Account/register',
      model,
      { responseType: 'text' }
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}
