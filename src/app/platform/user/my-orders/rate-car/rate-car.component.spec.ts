import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateCarComponent } from './rate-car.component';

describe('RateCarComponent', () => {
  let component: RateCarComponent;
  let fixture: ComponentFixture<RateCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RateCarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RateCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
