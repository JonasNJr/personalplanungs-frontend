import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalentwicklungViewComponent } from './personalentwicklung-view.component';

describe('PersonalentwicklungViewComponent', () => {
  let component: PersonalentwicklungViewComponent;
  let fixture: ComponentFixture<PersonalentwicklungViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalentwicklungViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalentwicklungViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
