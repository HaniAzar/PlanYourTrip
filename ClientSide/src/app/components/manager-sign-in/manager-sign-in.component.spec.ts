import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSignInComponent } from './manager-sign-in.component';

describe('ManagerSignInComponent', () => {
  let component: ManagerSignInComponent;
  let fixture: ComponentFixture<ManagerSignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerSignInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
