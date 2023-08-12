import { TestBed } from '@angular/core/testing';

import { BlockUnblockUserService } from './block-unblock-user.service';

describe('BlockUnblockUserService', () => {
  let service: BlockUnblockUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockUnblockUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
