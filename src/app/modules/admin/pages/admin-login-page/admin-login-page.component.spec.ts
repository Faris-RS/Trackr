import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { AdminLoginPageComponent } from './admin-login-page.component';
import { AdminLoginComponent } from '../../partials/admin-login/admin-login.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { BackgroundComponent } from 'src/app/shared/components/background/background.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('AdminLoginPageComponent', () => {
  let component: AdminLoginPageComponent;
  let fixture: ComponentFixture<AdminLoginPageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AdminLoginPageComponent,
        AdminLoginComponent,
        InputComponent,
        BackgroundComponent,
      ],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLogged to true and navigate to /user/home if userToken is present', () => {
    spyOn(localStorage, 'getItem').and.returnValue('someToken');
    component.ngOnInit();
    expect(component.isLogged).toBe(true);
    expect(router.navigate).toHaveBeenCalledOnceWith(['/admin/home']);
  });

  it('should set isLogged to false and navigate to /user/login if userToken is not present', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.ngOnInit();
    expect(component.isLogged).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/admin/login']);
  });
});
