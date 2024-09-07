import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffsetContributionComponent } from './offset-contribution.component';

describe('OffsetContributionComponent', () => {
  let component: OffsetContributionComponent;
  let fixture: ComponentFixture<OffsetContributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffsetContributionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffsetContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
