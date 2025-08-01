import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalentwicklungVorschauComponent } from './personalentwicklung-vorschau.component';

describe('PersonalentwicklungVorschauComponent', () => {
  let component: PersonalentwicklungVorschauComponent;
  let fixture: ComponentFixture<PersonalentwicklungVorschauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalentwicklungVorschauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalentwicklungVorschauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
