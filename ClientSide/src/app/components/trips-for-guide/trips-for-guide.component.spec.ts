import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsForGuideComponent } from './trips-for-guide.component';

describe('TripsForGuideComponent', () => {
  let component: TripsForGuideComponent;
  let fixture: ComponentFixture<TripsForGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsForGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsForGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
