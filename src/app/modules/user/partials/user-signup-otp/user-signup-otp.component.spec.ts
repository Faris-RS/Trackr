import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignupOtpComponent } from './user-signup-otp.component';

describe('UserSignupOtpComponent', () => {
  let component: UserSignupOtpComponent;
  let fixture: ComponentFixture<UserSignupOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSignupOtpComponent],
    });
    fixture = TestBed.createComponent(UserSignupOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
