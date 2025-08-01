import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BefristungFormularComponent } from './befristung-formular.component';

describe('BefristungFormularComponent', () => {
  let component: BefristungFormularComponent;
  let fixture: ComponentFixture<BefristungFormularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BefristungFormularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BefristungFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
