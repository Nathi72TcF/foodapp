import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VieworderPage } from './vieworder.page';

describe('VieworderPage', () => {
  let component: VieworderPage;
  let fixture: ComponentFixture<VieworderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VieworderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VieworderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
