import { TestBed } from '@angular/core/testing';

import { PrimaryInfoService } from './primary-info.service.ts.service';

describe('PrimaryInfoService', () => {
  let service: PrimaryInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimaryInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
