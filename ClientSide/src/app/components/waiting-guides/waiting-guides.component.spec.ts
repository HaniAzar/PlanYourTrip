import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingGuidesComponent } from './waiting-guides.component';

describe('WaitingGuidesComponent', () => {
  let component: WaitingGuidesComponent;
  let fixture: ComponentFixture<WaitingGuidesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingGuidesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingGuidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
