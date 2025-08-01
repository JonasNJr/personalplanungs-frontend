import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitarbeiterFormularComponent } from './mitarbeiter-formular.component';

describe('MitarbeiterFormularComponent', () => {
  let component: MitarbeiterFormularComponent;
  let fixture: ComponentFixture<MitarbeiterFormularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MitarbeiterFormularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MitarbeiterFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
