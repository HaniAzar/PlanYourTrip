import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndPlanningComponent } from './end-planning.component';

describe('EndPlanningComponent', () => {
  let component: EndPlanningComponent;
  let fixture: ComponentFixture<EndPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
