import { TestBed } from '@angular/core/testing';

import { GetSelectedVehicleService } from './get-selected-vehicle.service';

describe('GetCurrentVehicleService', () => {
  let service: GetCurrentVehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCurrentVehicleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
