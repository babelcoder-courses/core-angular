import { TestBed, inject } from '@angular/core/testing';

import { MockAuthService } from './mock-auth.service';

describe('MockAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockAuthService]
    });
  });

  it('should ...', inject([MockAuthService], (service: MockAuthService) => {
    expect(service).toBeTruthy();
  }));
});
