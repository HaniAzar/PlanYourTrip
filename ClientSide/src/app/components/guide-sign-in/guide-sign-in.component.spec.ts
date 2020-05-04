import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideSignInComponent } from './guide-sign-in.component';

describe('GuideSignInComponent', () => {
  let component: GuideSignInComponent;
  let fixture: ComponentFixture<GuideSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
