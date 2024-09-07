import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTrackerComponent } from './personal-tracker.component';

describe('PersonalTrackerComponent', () => {
  let component: PersonalTrackerComponent;
  let fixture: ComponentFixture<PersonalTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
