import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { keystrokeCaptureGuard } from './keystroke-capture.guard';

describe('keystrokeCaptureGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => keystrokeCaptureGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
