import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KapazitaetsabweichungFormularComponent } from './kapazitaetsabweichung-formular.component';


describe('KapazitaetsabweichungFormularComponent', () => {
  let component: KapazitaetsabweichungFormularComponent;
  let fixture: ComponentFixture<KapazitaetsabweichungFormularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KapazitaetsabweichungFormularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KapazitaetsabweichungFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
