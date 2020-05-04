import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareTripComponent } from './share-trip.component';

describe('ShareTripComponent', () => {
  let component: ShareTripComponent;
  let fixture: ComponentFixture<ShareTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
