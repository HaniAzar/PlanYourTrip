import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuideToTripComponent } from './add-guide-to-trip.component';

describe('AddGuideToTripComponent', () => {
  let component: AddGuideToTripComponent;
  let fixture: ComponentFixture<AddGuideToTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGuideToTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGuideToTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
