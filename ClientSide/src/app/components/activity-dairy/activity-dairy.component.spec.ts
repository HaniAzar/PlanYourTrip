import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDairyComponent } from './activity-dairy.component';

describe('ActivityDairyComponent', () => {
  let component: ActivityDairyComponent;
  let fixture: ComponentFixture<ActivityDairyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityDairyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDairyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
