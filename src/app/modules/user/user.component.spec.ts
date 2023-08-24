import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserComponent } from './user.component';
import { Router } from '@angular/router';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let routerStub: any;

  beforeEach(async () => {
    routerStub = {
      url: '/user/', // Set the default URL
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [UserComponent],
      providers: [{ provide: Router, useValue: routerStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /user/home when initialized with /user/', () => {
    component.ngOnInit();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/user/home']);
  });

  it('should navigate to /user/home when initialized with /user or /user/ or /user/something-else', () => {
    routerStub.url = '/user';
    component.ngOnInit();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/user/home']);
  });

  it('should not navigate when initialized with other route', () => {
    routerStub.url = '/user/profile'; 
    component.ngOnInit();
    expect(routerStub.navigate).not.toHaveBeenCalled();
  });

  it('should navigate when initialized with /user/ and then /user/profile', () => {
    routerStub.url = '/user/'; 
    component.ngOnInit();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/user/home']);

    routerStub.url = '/user/profile';
    component.ngOnInit();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/user/home']);
  });
});
