import { TestBed } from '@angular/core/testing';

import { PreguntasAdminService } from './preguntas-admin.service';

describe('PreguntasAdminService', () => {
  let service: PreguntasAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreguntasAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
