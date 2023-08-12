import { TestBed } from '@angular/core/testing';

import { GetVehiclesService } from './get-vehicles.service';

describe('GetVehiclesService', () => {
  let service: GetVehiclesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetVehiclesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
