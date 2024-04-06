import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../../../../Car';
import { CarentalServiceService } from '../../Services/carental-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-editcar',
  templateUrl: './editcar.component.html',
  styleUrl: './editcar.component.css',
  providers: [CurrencyPipe],
})
export class EditcarComponent implements OnInit {
  // IMG Upload
  imgSrc: string = '/assets/imgs/placeholder-image.jpeg';
  selectedImage: any = null;

  showDeleteConfirmation = false;

  constructor(
    private route: ActivatedRoute,
    private carService: CarentalServiceService,
    private currencyPipe: CurrencyPipe,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  getFormattedPrice(price: number): { amount: string; currency: string } {
    const formattedPrice =
      this.currencyPipe.transform(price, 'EGP', 'symbol', '1.0-0') || '';
    const parts = formattedPrice.split(' ');
    return {
      amount: parts[1],
      currency: 'EGP',
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const carId = +params['Id'];
      this.carService.getCarById(carId).subscribe((car) => {
        this.car = car;

        if (this.car.Image !== '') {
          this.imgSrc = car.Images;
        }
      });
    });
  }

  car: any = new Car(0, '', '', '', '', '', '', 0, 0, '', false, false);

  onSubmit() {
    if (this.selectedImage) {
      this.uploadImage();
    } else {
      this.editCarWithouImg();
    }
  }

  onDelete() {
    this.showDeleteConfirmation = true;
  }

  onDeleteConfirmed() {
    this.carService.deleteCar(this.car.Id).subscribe({
      next: () => {
        console.log('Car deleted successfully');
        this.router.navigateByUrl('/admin/cars');
      },
      error: () => {
        console.log('Failed to delete car');
      },
    });
    this.closeModal();
  }

  closeModal() {
    this.showDeleteConfirmation = false;
  }

  editCar(imgUrl: string) {
    this.car.Images = imgUrl;
    this.carService.editCar(this.car).subscribe({
      next: () => {
        console.log('Car edited successfully');
        this.router.navigateByUrl('/admin/cars');
      },
      error: () => {
        console.log('Failed to edit car');
      },
    });
  }

  editCarWithouImg() {
    this.carService.editCar(this.car).subscribe({
      next: () => {
        console.log('Car edited successfully');
        this.router.navigateByUrl('/admin/cars');
      },
      error: () => {
        console.log('Failed to edit car');
      },
    });
  }

  uploadImage() {
    const filePath = `Car_Imgs/${this.car.Name}/${
      this.selectedImage.name
    }_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedImage);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.editCar(url);
          });
        })
      )
      .subscribe();
  }

  showPreview(e: any) {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(e.target.files[0]);
      this.selectedImage = e.target.files[0];
    } else {
      this.imgSrc = this.car.Image;
      this.selectedImage = null;
    }
  }
}
