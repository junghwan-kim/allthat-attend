import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LecDetailPage } from './lec-detail.page';

describe('LecDetailPage', () => {
  let component: LecDetailPage;
  let fixture: ComponentFixture<LecDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LecDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LecDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
