import { TestBed } from '@angular/core/testing';

import { KeystrokeService } from './keystroke.service';

describe('KeystrokeService', () => {
  let service: KeystrokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeystrokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
