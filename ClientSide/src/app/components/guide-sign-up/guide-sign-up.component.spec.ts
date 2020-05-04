import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideSignUpComponent } from './guide-sign-up.component';

describe('GuideSignUpComponent', () => {
  let component: GuideSignUpComponent;
  let fixture: ComponentFixture<GuideSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
