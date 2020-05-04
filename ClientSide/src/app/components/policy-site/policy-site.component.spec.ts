import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicySiteComponent } from './policy-site.component';

describe('PolicySiteComponent', () => {
  let component: PolicySiteComponent;
  let fixture: ComponentFixture<PolicySiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicySiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicySiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
