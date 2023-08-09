import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMunicipalityComponent } from './dialog-municipality.component';

describe('DialogMunicipalityComponent', () => {
  let component: DialogMunicipalityComponent;
  let fixture: ComponentFixture<DialogMunicipalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMunicipalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMunicipalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
