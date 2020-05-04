import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRequestsComponent } from './training-requests.component';

describe('TrainingRequestsComponent', () => {
  let component: TrainingRequestsComponent;
  let fixture: ComponentFixture<TrainingRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
