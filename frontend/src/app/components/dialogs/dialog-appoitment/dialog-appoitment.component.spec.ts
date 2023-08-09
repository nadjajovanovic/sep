import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAppoitmentComponent } from './dialog-appoitment.component';

describe('DialogAppoitmentComponent', () => {
  let component: DialogAppoitmentComponent;
  let fixture: ComponentFixture<DialogAppoitmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAppoitmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAppoitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
