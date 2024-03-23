import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from './constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetpaydataService {

  constructor(private http: HttpClient) {}

}
