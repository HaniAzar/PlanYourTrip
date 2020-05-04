import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoiningToTripComponent } from './joining-to-trip.component';

describe('JoiningToTripComponent', () => {
  let component: JoiningToTripComponent;
  let fixture: ComponentFixture<JoiningToTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoiningToTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoiningToTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
