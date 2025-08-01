import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KapazitaetsMonateViewComponent } from './kapazitaets-monate-view.component';

describe('KapazitaetsMonateViewComponent', () => {
  let component: KapazitaetsMonateViewComponent;
  let fixture: ComponentFixture<KapazitaetsMonateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KapazitaetsMonateViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KapazitaetsMonateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
