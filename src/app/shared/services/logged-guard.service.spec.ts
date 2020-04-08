import { TestBed } from '@angular/core/testing';

import { LoggedGuardService } from './logged-guard.service';

describe('LoggedGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggedGuardService = TestBed.get(LoggedGuardService);
    expect(service).toBeTruthy();
  });
});
