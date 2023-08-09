import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInsuranceComponent } from './dialog-insurance.component';

describe('DialogInsuranceComponent', () => {
  let component: DialogInsuranceComponent;
  let fixture: ComponentFixture<DialogInsuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInsuranceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
