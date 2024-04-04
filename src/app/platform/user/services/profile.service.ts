import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../Types/user';
import { jwtDecode } from 'jwt-decode';
import { UserEdit } from '../Types/UserEdit';
// import { Logindata } from '../../../auth/components/login/login.component';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  token= localStorage.getItem('token'); 
  userguid: string = '';

  constructor(private http: HttpClient) { }

  getuserguid() {
    if (this.token) {
        const decodedToken = jwtDecode(localStorage.getItem('token')!);
        console.log('Decoded Token:', decodedToken); // Add this line
        const parsedToken = JSON.parse(JSON.stringify(decodedToken));
        this.userguid =
            parsedToken[
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        console.log('User GUID:', this.userguid);
        

    }
}

  getUserData(): Observable<User> {
    this.getuserguid();
    return this.http.get<User>(`https://localhost:7283/api/User/Logged/${this.userguid}`);
  }
  editUser(model:UserEdit){
    return this.http.put(`https://localhost:7283/api/User/${this.userguid}`,model)
  }

deleteReservation(id:number)
{
  return this.http.delete(`https://localhost:7283/api/Reservations/${id}`)

}
}
