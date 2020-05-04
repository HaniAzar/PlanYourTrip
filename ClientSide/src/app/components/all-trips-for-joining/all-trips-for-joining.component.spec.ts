import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTripsForJoiningComponent } from './all-trips-for-joining.component';

describe('AllTripsForJoiningComponent', () => {
  let component: AllTripsForJoiningComponent;
  let fixture: ComponentFixture<AllTripsForJoiningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTripsForJoiningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTripsForJoiningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
