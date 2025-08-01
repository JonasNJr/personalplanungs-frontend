import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BefristungMitarbeiterViewComponent } from './befristung-mitarbeiter-view.component';

describe('BefristungMitarbeiterViewComponent', () => {
  let component: BefristungMitarbeiterViewComponent;
  let fixture: ComponentFixture<BefristungMitarbeiterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BefristungMitarbeiterViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BefristungMitarbeiterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
