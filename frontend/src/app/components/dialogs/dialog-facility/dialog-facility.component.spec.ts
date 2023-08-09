import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFacilityComponent } from './dialog-facility.component';

describe('DialogFacilityComponent', () => {
  let component: DialogFacilityComponent;
  let fixture: ComponentFixture<DialogFacilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFacilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
