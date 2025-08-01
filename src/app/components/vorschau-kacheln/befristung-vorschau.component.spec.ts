import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BefristungVorschauComponent } from './befristung-vorschau.component';

describe('BefristungVorschauComponent', () => {
  let component: BefristungVorschauComponent;
  let fixture: ComponentFixture<BefristungVorschauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BefristungVorschauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BefristungVorschauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
