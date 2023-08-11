import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRentDetailsComponent } from './add-rent-details.component';

describe('AddRentDetailsComponent', () => {
  let component: AddRentDetailsComponent;
  let fixture: ComponentFixture<AddRentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRentDetailsComponent],
    });
    fixture = TestBed.createComponent(AddRentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
