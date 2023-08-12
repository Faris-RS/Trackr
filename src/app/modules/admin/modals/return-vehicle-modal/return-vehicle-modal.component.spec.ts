import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnVehicleModalComponent } from './return-vehicle-modal.component';

describe('ReturnVehicleModalComponent', () => {
  let component: ReturnVehicleModalComponent;
  let fixture: ComponentFixture<ReturnVehicleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReturnVehicleModalComponent],
    });
    fixture = TestBed.createComponent(ReturnVehicleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
