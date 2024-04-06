import { Component, OnInit } from '@angular/core';
import { User } from '../Types/user';
import { ProfileService } from '../services/profile.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reservation } from '../../../Reservation';
import { UserEdit } from '../Types/UserEdit';
import { Router } from '@angular/router';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService],
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;

  imgSrc: string = '/assets/imgs/placeholder-image.jpeg';
  selectedImage: any = null;
  isLoading = false;

  userForm = new FormGroup({
    Image: new FormControl<string>(''),

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
    Address: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private storage: AngularFireStorage,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isLoading = false;
    this.getUser();
  }

  getUser() {
    this.profileService.getUserData().subscribe({
      next: (res: User) => {
        this.user = res;

        this.userForm.patchValue({
          Name: res.Name,
          PhoneNumber: res.PhoneNumber,
          IdNumber: res.NationalIdentityNumber,
          Address: res.Address,
        });

        if (this.user.Image !== '') {
          this.imgSrc = this.user.Image;
        }
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        this.toastFailed('Error fetching user data:');
      },
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.selectedImage) {
      this.uploadImage();
    } else {
      this.updateUserWithoutImage();
    }
  }

  updateUserWithImage(imageUrl: string) {
    const model: UserEdit = {
      name: this.userForm.value.Name!,
      password: 'Aa12345678',
      email: this.user.Email,
      phoneNumber: this.userForm.value.PhoneNumber!,
      address: this.userForm.value.Address!,
      image: imageUrl,
      nationalIdentityNumber: this.userForm.value.IdNumber!,
    };

    this.profileService.editUser(model).subscribe({
      next: (res) => {
        const query = {
          update: 'success',
        };
        this.router.navigate([''], { queryParams: query });
      },
      error: (err) => {
        console.error('Error updating user:', err);
        this.toastFailed('Updating Profile Failed Please Try Again');
      },
    });
  }

  updateUserWithoutImage() {
    const model: UserEdit = {
      name: this.userForm.value.Name!,
      password: 'Aa12345678',
      email: this.user.Email,
      phoneNumber: this.userForm.value.PhoneNumber!,
      address: this.userForm.value.Address!,
      image: this.user.Image || '', // Use existing image URL if available
      nationalIdentityNumber: this.userForm.value.IdNumber!,
    };

    this.profileService.editUser(model).subscribe({
      next: (res) => {
        const query = {
          update: 'success',
        };
        this.router.navigate([''], { queryParams: query });
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Error updating user:', err);
        this.toastFailed('Updating Profile Failed Please Try Again');
      },
    });
  }

  uploadImage() {
    const filePath = `usersImgs/${this.userForm.value.Name}/${
      this.selectedImage.name
    }_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedImage);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.updateUserWithImage(url);
          });
        })
      )
      .subscribe({
        next: () => {
          this.toastSuccess('Updating User Profile');
        },
        error: () => {
          this.toastFailed('Failed to Update User Profile');
        },
      });
  }

  showPreview(e: any) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(e.target.files[0]);
      this.selectedImage = e.target.files[0];
    } else {
      this.imgSrc = this.user.Image;
      this.selectedImage = null;
    }
  }

  // Toast Functions
  toastSuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  toastFailed(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'error',
      detail: message,
    });
  }
}
