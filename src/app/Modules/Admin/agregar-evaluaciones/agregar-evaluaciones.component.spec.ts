import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEvaluacionesComponent } from './agregar-evaluaciones.component';

describe('AgregarEvaluacionesComponent', () => {
  let component: AgregarEvaluacionesComponent;
  let fixture: ComponentFixture<AgregarEvaluacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEvaluacionesComponent]
    });
    fixture = TestBed.createComponent(AgregarEvaluacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
