import { TestBed } from '@angular/core/testing';

import { ReturnVehicleService } from './return-vehicle.service';

describe('ReturnVehicleService', () => {
  let service: ReturnVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturnVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
