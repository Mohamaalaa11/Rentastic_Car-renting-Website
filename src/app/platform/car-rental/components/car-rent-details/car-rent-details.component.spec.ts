import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRentDetailsComponent } from './car-rent-details.component';

describe('CarRentDetailsComponent', () => {
  let component: CarRentDetailsComponent;
  let fixture: ComponentFixture<CarRentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarRentDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarRentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
