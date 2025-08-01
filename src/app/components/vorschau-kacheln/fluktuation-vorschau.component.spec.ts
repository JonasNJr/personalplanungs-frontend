import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluktuationVorschauComponent } from './fluktuation-vorschau.component';

describe('FluktuationVorschauComponent', () => {
  let component: FluktuationVorschauComponent;
  let fixture: ComponentFixture<FluktuationVorschauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluktuationVorschauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluktuationVorschauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
