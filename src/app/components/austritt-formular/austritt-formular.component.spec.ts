import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AustrittFormularComponent } from './austritt-formular.component';

describe('AustrittFormularComponent', () => {
  let component: AustrittFormularComponent;
  let fixture: ComponentFixture<AustrittFormularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AustrittFormularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AustrittFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
