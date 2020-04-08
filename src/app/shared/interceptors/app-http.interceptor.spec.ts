import { TestBed } from '@angular/core/testing';

import { AppHttpInterceptor } from './app-http.interceptor';

describe('AppHttpInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppHttpInterceptor = TestBed.get(AppHttpInterceptor);
    expect(service).toBeTruthy();
  });
});
