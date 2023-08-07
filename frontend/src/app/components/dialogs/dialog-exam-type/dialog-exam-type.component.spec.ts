import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExamTypeComponent } from './dialog-exam-type.component';

describe('DialogExamTypeComponent', () => {
  let component: DialogExamTypeComponent;
  let fixture: ComponentFixture<DialogExamTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExamTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExamTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
