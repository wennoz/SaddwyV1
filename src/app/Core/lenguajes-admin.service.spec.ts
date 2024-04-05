import { TestBed } from '@angular/core/testing';

import { LenguajesAdminService } from './lenguajes-admin.service';

describe('LenguajesAdminService', () => {
  let service: LenguajesAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LenguajesAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
