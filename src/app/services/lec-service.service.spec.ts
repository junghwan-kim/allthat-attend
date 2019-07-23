import { TestBed } from '@angular/core/testing';

import { LecServiceService } from './lec-service.service';

describe('LecServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LecServiceService = TestBed.get(LecServiceService);
    expect(service).toBeTruthy();
  });
});
