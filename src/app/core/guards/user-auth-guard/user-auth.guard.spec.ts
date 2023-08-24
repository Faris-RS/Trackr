import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { userAuthGuard } from './user-auth.guard';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

describe('userAuthGuard', () => {
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
        { provide: userAuthGuard, useClass: userAuthGuard },
        { provide: Router, useValue: mockRouter },
        { provide: HotToastService, useValue: mockToastService },
      ],
    });

    guard = TestBed.inject(userAuthGuard);
  });

  it('should return true if userToken is present', () => {
    localStorage.setItem('userToken', 'someToken');
    const routeSnapshot = new ActivatedRouteSnapshot();
    const stateSnapshot = jasmine.createSpyObj<RouterStateSnapshot>(
      'RouterStateSnapshot',
      ['toString']
    );
    const canActivate = guard.canActivate(routeSnapshot, stateSnapshot);
    expect(canActivate).toBe(true);
  });

  it('should navigate to /user/login and display error toast if userToken is not present', () => {
    localStorage.removeItem('userToken');
    const routeSnapshot = new ActivatedRouteSnapshot();
    const stateSnapshot = jasmine.createSpyObj<RouterStateSnapshot>(
      'RouterStateSnapshot',
      ['toString']
    );
    const canActivate = guard.canActivate(routeSnapshot, stateSnapshot);
    expect(canActivate).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/user/login']);
    expect(mockToastService.error).toHaveBeenCalledWith('Please login');
  });
});
