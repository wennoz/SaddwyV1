import { TestBed } from '@angular/core/testing';

import { ContactoAdminService } from './contacto-admin.service';

describe('ContactoAdminService', () => {
  let service: ContactoAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactoAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
