import { TestBed } from '@angular/core/testing';

import { HeadersInterceptor } from './headers.interceptor';

describe('HeadersInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeadersInterceptor = TestBed.get(HeadersInterceptor);
    expect(service).toBeTruthy();
  });
});
