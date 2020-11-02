import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatepolicyPage } from './privatepolicy.page';

describe('PrivatepolicyPage', () => {
  let component: PrivatepolicyPage;
  let fixture: ComponentFixture<PrivatepolicyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivatepolicyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatepolicyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
