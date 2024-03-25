import { TestBed } from '@angular/core/testing';

import { CarentalServiceService } from './carental-service.service';

describe('CarentalServiceService', () => {
  let service: CarentalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarentalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
