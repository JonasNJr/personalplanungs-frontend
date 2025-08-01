import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AustritteVorschauComponent } from './austritte-vorschau.component';

describe('AustritteVorschauComponent', () => {
  let component: AustritteVorschauComponent;
  let fixture: ComponentFixture<AustritteVorschauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AustritteVorschauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AustritteVorschauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
