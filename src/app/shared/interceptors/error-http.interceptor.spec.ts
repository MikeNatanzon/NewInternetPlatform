import { TestBed } from '@angular/core/testing';

import { ErrorHttpInterceptor } from './error-http.interceptor';

describe('ErrorHttpInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorHttpInterceptor = TestBed.get(ErrorHttpInterceptor);
    expect(service).toBeTruthy();
  });
});
