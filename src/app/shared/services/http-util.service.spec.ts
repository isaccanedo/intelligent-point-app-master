import { TestBed } from '@angular/core/testing';

import { HttpUtilService } from './http-util.service';

describe('HttpUtilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpUtilService = TestBed.get(HttpUtilService);
    expect(service).toBeTruthy();
  });
});
