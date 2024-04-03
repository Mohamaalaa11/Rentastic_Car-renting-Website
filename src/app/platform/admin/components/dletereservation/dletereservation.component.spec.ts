import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DletereservationComponent } from './dletereservation.component';

describe('DletereservationComponent', () => {
  let component: DletereservationComponent;
  let fixture: ComponentFixture<DletereservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DletereservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DletereservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
