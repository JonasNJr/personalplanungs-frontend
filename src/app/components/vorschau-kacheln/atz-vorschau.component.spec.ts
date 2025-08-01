import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtzVorschauComponent } from './atz-vorschau.component';

describe('AtzVorschauComponent', () => {
  let component: AtzVorschauComponent;
  let fixture: ComponentFixture<AtzVorschauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtzVorschauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtzVorschauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
