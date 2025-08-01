import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KapazitaetsabweichungenViewComponent } from './kapazitaetsabweichungen-view.component';

describe('KapazitaetsabweichungenViewComponent', () => {
  let component: KapazitaetsabweichungenViewComponent;
  let fixture: ComponentFixture<KapazitaetsabweichungenViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KapazitaetsabweichungenViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KapazitaetsabweichungenViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
