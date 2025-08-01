import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitarbeiterVorschauComponent } from './mitarbeiter-vorschau.component';

describe('MitarbeiterVorschauComponent', () => {
  let component: MitarbeiterVorschauComponent;
  let fixture: ComponentFixture<MitarbeiterVorschauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MitarbeiterVorschauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MitarbeiterVorschauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
