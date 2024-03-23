import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Car } from '../../../Car';
import { CarentalServiceService } from '../../../Services/carental-service.service';
import { Router } from '@angular/router';
import { prod } from '../../../prod';

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrl: './addcar.component.css'
})
export class AddcarComponent {
 
  carForm: FormGroup;
 

  constructor(private formBuilder: FormBuilder, private carService: CarentalServiceService, private router: Router) {
    this.carForm = this.formBuilder.group({
      brand: ['', Validators.required],
      name: ['', Validators.required],
      modelYear: ['', Validators.required],
      color: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      seatCount: ['', Validators.required],
      gear: ['', Validators.required],
      pricePerDay: ['', Validators.required],
      isCondition: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.carForm.valid) {
    
      this.carService.addCar(this.carForm.value).subscribe(() => {
        this.router.navigateByUrl('/car');
      });
    }
  }

  
 
}
