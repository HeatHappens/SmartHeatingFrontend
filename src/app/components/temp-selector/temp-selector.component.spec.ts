import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempSelectorComponent } from './temp-selector.component';

describe('TempSelectorComponent', () => {
  let component: TempSelectorComponent;
  let fixture: ComponentFixture<TempSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
