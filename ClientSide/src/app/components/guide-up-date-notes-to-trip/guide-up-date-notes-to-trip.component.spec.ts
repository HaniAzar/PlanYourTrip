import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideUpDateNotesToTripComponent } from './guide-up-date-notes-to-trip.component';

describe('GuideUpDateNotesToTripComponent', () => {
  let component: GuideUpDateNotesToTripComponent;
  let fixture: ComponentFixture<GuideUpDateNotesToTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideUpDateNotesToTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideUpDateNotesToTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
