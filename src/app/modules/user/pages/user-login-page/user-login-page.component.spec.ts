import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserLoginPageComponent } from './user-login-page.component';
import { UserLoginComponent } from '../../partials/user-login/user-login.component';
import { BackgroundComponent } from 'src/app/shared/components/background/background.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';

describe('UserLoginPageComponent', () => {
  let component: UserLoginPageComponent;
  let fixture: ComponentFixture<UserLoginPageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [
        UserLoginPageComponent,
        UserLoginComponent,
        BackgroundComponent,
        InputComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserLoginPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLogged to true and navigate to /user/home if userToken is present', () => {
    spyOn(localStorage, 'getItem').and.returnValue('someToken');
    component.ngOnInit();
    expect(component.isLogged).toBe(true);
    expect(router.navigate).toHaveBeenCalledWith(['/user/home']);
  });

  it('should set isLogged to false and navigate to /user/login if userToken is not present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.ngOnInit();
    expect(component.isLogged).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/user/login']);
  });
});
