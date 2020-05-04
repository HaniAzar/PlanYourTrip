import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingAttractionsComponent } from './waiting-attractions.component';

describe('WaitingAttractionsComponent', () => {
  let component: WaitingAttractionsComponent;
  let fixture: ComponentFixture<WaitingAttractionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingAttractionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingAttractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
