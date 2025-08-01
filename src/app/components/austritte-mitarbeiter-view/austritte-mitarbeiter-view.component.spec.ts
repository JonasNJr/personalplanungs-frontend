import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AustritteMitarbeiterViewComponent } from './austritte-mitarbeiter-view.component';

describe('AustritteMitarbeiterViewComponent', () => {
  let component: AustritteMitarbeiterViewComponent;
  let fixture: ComponentFixture<AustritteMitarbeiterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AustritteMitarbeiterViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AustritteMitarbeiterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
