import { TestBed } from '@angular/core/testing';

import { JJService } from './jj.service';

describe('JJService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JJService = TestBed.get(JJService);
    expect(service).toBeTruthy();
  });
});
