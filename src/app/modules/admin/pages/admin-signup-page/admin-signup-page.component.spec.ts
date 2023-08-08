import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSignupPageComponent } from './admin-signup-page.component';

describe('AdminSignupPageComponent', () => {
  let component: AdminSignupPageComponent;
  let fixture: ComponentFixture<AdminSignupPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSignupPageComponent],
    });
    fixture = TestBed.createComponent(AdminSignupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
