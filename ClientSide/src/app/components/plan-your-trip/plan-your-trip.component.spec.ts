import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanYourTripComponent } from './plan-your-trip.component';

describe('PlanYourTripComponent', () => {
  let component: PlanYourTripComponent;
  let fixture: ComponentFixture<PlanYourTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanYourTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanYourTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
