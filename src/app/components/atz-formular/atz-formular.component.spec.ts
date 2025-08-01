import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtzFormularComponent } from './atz-formular.component';

describe('AtzFormularComponent', () => {
  let component: AtzFormularComponent;
  let fixture: ComponentFixture<AtzFormularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtzFormularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtzFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
