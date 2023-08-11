import { TestBed } from '@angular/core/testing';

import { TogglePageService } from './toggle-page.service';

describe('TogglePageService', () => {
  let service: TogglePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TogglePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
