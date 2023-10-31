import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { sellerRoleGuardGuard } from './seller-role-guard.guard';

describe('sellerRoleGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => sellerRoleGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
