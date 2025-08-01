import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KapazitaetsabweichungVorschauComponent } from './kapazitaetsabweichung-vorschau.component';

describe('KapazitaetsabweichungVorschauComponent', () => {
  let component: KapazitaetsabweichungVorschauComponent;
  let fixture: ComponentFixture<KapazitaetsabweichungVorschauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KapazitaetsabweichungVorschauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KapazitaetsabweichungVorschauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
