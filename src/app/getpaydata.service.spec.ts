import { TestBed } from '@angular/core/testing';

import { GetpaydataService } from './payMob/getpaydata.service';

describe('GetpaydataService', () => {
  let service: GetpaydataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetpaydataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
