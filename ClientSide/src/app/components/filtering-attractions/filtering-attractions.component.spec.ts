import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteringAttractionsComponent } from './filtering-attractions.component';

describe('FilteringAttractionsComponent', () => {
  let component: FilteringAttractionsComponent;
  let fixture: ComponentFixture<FilteringAttractionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteringAttractionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteringAttractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
