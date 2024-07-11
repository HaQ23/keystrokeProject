import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { dataConsentGuard } from './data-consent.guard';

describe('dataConsentGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => dataConsentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
