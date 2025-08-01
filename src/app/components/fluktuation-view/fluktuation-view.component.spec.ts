import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluktuationViewComponent } from './fluktuation-view.component';

describe('FluktuationViewComponent', () => {
  let component: FluktuationViewComponent;
  let fixture: ComponentFixture<FluktuationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FluktuationViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FluktuationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
