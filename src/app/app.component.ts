import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `
    <div>
      <app-listcar (addCarClick)="toggleAddCarForm()"></app-listcar>
    </div>

    <app-addcar *ngIf="showAddCarForm"></app-addcar>
  `,
})
export class AppComponent implements OnInit {
  title = 'Rentastic-webApp';
  showAddCarForm: boolean = false;

  constructor(
    private authServices: AuthService,
    private route: Router,
    private firestorage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.authServices.isLoggedIn$.next(true);
    }

    if (localStorage.getItem('role') === 'Admin') {
      this.authServices.isAdmin$.next(true);
    }
  }

  toggleAddCarForm() {
    this.showAddCarForm = !this.showAddCarForm;
  }

  async fireUpload(file: any) {
    if (file) {
      const path = `web/${file.name}`;
      const upload = await this.firestorage.upload(path, file);
      const url = await upload.ref.getDownloadURL();
      console.log(url);
    }
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    return file;
  }
}
