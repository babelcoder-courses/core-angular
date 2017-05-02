import { TestBed, inject } from '@angular/core/testing';

import { MockBookService } from './mock-book.service';

describe('MockBookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockBookService]
    });
  });

  it('should ...', inject([MockBookService], (service: MockBookService) => {
    expect(service).toBeTruthy();
  }));
});
