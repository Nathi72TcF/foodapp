import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryorderPage } from './historyorder.page';

describe('HistoryorderPage', () => {
  let component: HistoryorderPage;
  let fixture: ComponentFixture<HistoryorderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryorderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
