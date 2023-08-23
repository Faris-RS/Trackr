import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { adminAuthGuard } from './admin-auth.guard';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

describe('adminAuthGuard', () => {
  let guard: CanActivate;

  let mockRouter: any;
  let mockToastService: any;

  beforeEach(() => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    mockToastService = {
      error: jasmine.createSpy('error'),
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: adminAuthGuard, useClass: adminAuthGuard },
        { provide: Router, useValue: mockRouter },
        { provide: HotToastService, useValue: mockToastService },
      ],
    });

    guard = TestBed.inject(adminAuthGuard);
  });

  it('should return true if adminToken is present', () => {
    localStorage.setItem('adminToken', 'someToken');
    const routeSnapshot = new ActivatedRouteSnapshot();
    const stateSnapshot = jasmine.createSpyObj<RouterStateSnapshot>(
      'RouterStateSnapshot',
      ['toString']
    );
    const canActivate = guard.canActivate(routeSnapshot, stateSnapshot);
    expect(canActivate).toBe(true);
  });

  it('should navigate to /admin/login and display error toast if adminToken is not present', () => {
    localStorage.removeItem('adminToken');
    const routeSnapshot = new ActivatedRouteSnapshot();
    const stateSnapshot = jasmine.createSpyObj<RouterStateSnapshot>(
      'RouterStateSnapshot',
      ['toString']
    );
    const canActivate = guard.canActivate(routeSnapshot, stateSnapshot);
    expect(canActivate).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin/login']);
    expect(mockToastService.error).toHaveBeenCalledWith('Please login');
  });
});
