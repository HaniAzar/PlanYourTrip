import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidePlaningTripComponent } from './guide-planing-trip.component';

describe('GuidePlaningTripComponent', () => {
  let component: GuidePlaningTripComponent;
  let fixture: ComponentFixture<GuidePlaningTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuidePlaningTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuidePlaningTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
