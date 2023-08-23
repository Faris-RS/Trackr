import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminComponent } from './admin.component';
import { Router } from '@angular/router';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let routerStub: any;

  beforeEach(async () => {
    routerStub = {
      url: '/admin/',
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AdminComponent],
      providers: [{ provide: Router, useValue: routerStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /admin/home when initialized with /admin/', () => {
    component.ngOnInit();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/admin/home']);
  });

  it('should navigate to /admin/home when initialized with /admin or /admin/ or /admin/something-else', () => {
    routerStub.url = '/admin';
    component.ngOnInit();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/admin/home']);
  });

  it('should not navigate when initialized with other route', () => {
    routerStub.url = '/admin/dashboard';
    component.ngOnInit();
    expect(routerStub.navigate).not.toHaveBeenCalled();

    routerStub.url = '/admin/user-list';
    component.ngOnInit();
    expect(routerStub.navigate).not.toHaveBeenCalled();

    routerStub.url = '/admin/vehicle-details';
    component.ngOnInit();
    expect(routerStub.navigate).not.toHaveBeenCalled();

    routerStub.url = '/admin/add-vehicle';
    component.ngOnInit();
    expect(routerStub.navigate).not.toHaveBeenCalled();

    routerStub.url = '/admin/order-history';
    component.ngOnInit();
    expect(routerStub.navigate).not.toHaveBeenCalled();
  });

  it('should navigate when initialized with /admin/ and then to other admin routes', fakeAsync(() => {
    routerStub.url = '/admin/';
    component.ngOnInit();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/admin/home']);
    tick();

    routerStub.url = '/admin/dashboard';
    component.ngOnInit();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/admin/home']);
    tick();

    routerStub.url = '/admin/user-list';
    component.ngOnInit();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/admin/home']);
    tick();

    routerStub.url = '/admin/vehicle-details';
    component.ngOnInit();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/admin/home']);
    tick();

    routerStub.url = '/admin/add-vehicle';
    component.ngOnInit();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/admin/home']);
    tick();

    routerStub.url = '/admin/order-history';
    component.ngOnInit();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/admin/home']);
    tick();
  }));
});
