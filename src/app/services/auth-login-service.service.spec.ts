import { TestBed } from '@angular/core/testing';

import { AuthLoginServiceService } from './auth-login-service.service';

describe('AuthLoginServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthLoginServiceService = TestBed.get(AuthLoginServiceService);
    expect(service).toBeTruthy();
  });
});
