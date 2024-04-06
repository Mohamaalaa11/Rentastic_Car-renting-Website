import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Car } from '../../../../Car';
import { CarentalServiceService } from '../../Services/carental-service.service';
import { Router } from '@angular/router';
import { prod } from '../../../../prod';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AddCar } from '../../types/add-car';

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrl: './addcar.component.css',
})
export class AddcarComponent {
  // IMG Upload
  selectedImage: any = null;

  car: Car = {
    Id: 0,
    Name: '',
    Brand: '',
    ModelYear: '',
    Description: '',
    Color: '',
    Category: '',
    SeatCount: 0,
    PricePerDay: 0,
    Images: '',
    HasAirCondition: false,
    IsAutomatic: false,
  };
  carForm: FormGroup;
  errorMessages: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarentalServiceService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.carForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Brand: ['', Validators.required],
      ModelYear: [
        '',
        [
          Validators.required,
          Validators.pattern('^(19[0-9]{2}|20[0-1][0-9]|202[0-5])$'),
        ],
      ],
      Color: ['', Validators.required],
      Category: ['', Validators.required],
      Description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
      SeatCount: ['', [Validators.required, Validators.pattern(/^(2|4|6)$/)]],
      PricePerDay: ['', [Validators.required, Validators.min(0.01)]],
      HasAirCondition: [false, Validators.required],
      IsAutomatic: [false, Validators.required],
      Images: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.uploadImage();
  }

  addCar(imgUrl: string) {
    const model: AddCar = {
      Name: this.carForm.value.Name,
      Brand: this.carForm.value.Brand,
      ModelYear: this.carForm.value.ModelYear,
      Color: this.carForm.value.Color,
      Category: this.carForm.value.Category,
      Description: this.carForm.value.Description,
      SeatCount: this.carForm.value.SeatCount,
      PricePerDay: this.carForm.value.PricePerDay,
      HasAirCondition: this.carForm.value.HasAirCondition,
      IsAutomatic: this.carForm.value.IsAutomatic,
      Images: imgUrl,
    };

    console.log(model);

    if (this.carForm.valid) {
      this.carService.addCar(model).subscribe({
        next: () => {
          this.router.navigate(['', 'admin', 'cars']);
        },
        error: (errors) => {
          if (Array.isArray(errors)) {
            this.errorMessages = errors.map((error: any) => error.errorMessage);
          } else {
            this.errorMessages = [errors];
          }
        },
      });
    }
  }

  uploadImage() {
    const filePath = `Car_Imgs/${this.carForm.value.Name}/${
      this.selectedImage.name
    }_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedImage);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.addCar(url);
          });
        })
      )
      .subscribe();
  }

  onChangeImg(e: any) {
    this.selectedImage = e.target.files[0];
  }
}
