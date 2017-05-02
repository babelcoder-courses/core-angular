import { TestBed, inject } from '@angular/core/testing';

import { MockCategoryService } from './mock-category.service';

describe('MockCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockCategoryService]
    });
  });

  it('should ...', inject([MockCategoryService], (service: MockCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
