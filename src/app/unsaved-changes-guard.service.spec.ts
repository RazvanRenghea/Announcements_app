import { TestBed } from '@angular/core/testing';

import { UnsavedChangesGuard } from './unsaved-changes-guard.service';

describe('UnsavedChangesGuardService', () => {
  let service: UnsavedChangesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnsavedChangesGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
