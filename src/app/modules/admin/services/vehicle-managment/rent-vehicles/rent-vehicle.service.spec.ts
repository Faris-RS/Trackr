import { TestBed } from '@angular/core/testing';

import { RentVehicleService } from './rent-vehicle.service';

describe('RentVehicleService', () => {
  let service: RentVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
