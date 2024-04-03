import { Component, OnInit } from '@angular/core';
import { User } from '../Types/user';
import { ProfileService } from '../services/profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reservation } from '../../../Reservation';
import { UserEdit } from '../Types/UserEdit';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User ={}as User
  userForm =new FormGroup({
    Name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    PhoneNumber: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(/^(012|011|015|010)\d{8}$/),
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    IdNumber: new FormControl<string>('', [
      Validators.required,
      Validators.pattern(
        '^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$'
      ),
    ]),
    Address: new FormControl<string>('',[Validators.required])
  })
  constructor(private profileService: ProfileService,private router :Router) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {``
    this.profileService.getUserData().subscribe({
      next: (res: User) => {
        this.user = res;
        console.log( this.user)
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }
  onSubmit() {
    const model: UserEdit = {
      name: this.userForm.value.Name!, 
      password: "Aa12345678",
      email: this.user.Email ,
      phoneNumber: this.userForm.value.PhoneNumber!,
      address: this.userForm.value.Address!,
      image: this.user.Image,
      nationalIdentityNumber: this.userForm.value.IdNumber !
    };
     this.profileService.editUser(model).subscribe({
    next: (res) => {
      this.router.navigate([''])
    },
    error: (err) => {
      console.error('Error updating user:', err);
    }
  });
  
  }
  
  
}
