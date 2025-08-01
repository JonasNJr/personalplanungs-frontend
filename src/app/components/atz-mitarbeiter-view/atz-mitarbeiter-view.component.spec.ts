import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtzMitarbeiterViewComponent } from './atz-mitarbeiter-view.component';

describe('AtzMitarbeiterViewComponent', () => {
  let component: AtzMitarbeiterViewComponent;
  let fixture: ComponentFixture<AtzMitarbeiterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtzMitarbeiterViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtzMitarbeiterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
