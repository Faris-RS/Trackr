import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let destroy$: Subject<void>;

  beforeEach(waitForAsync(() => {
    destroy$ = new Subject<void>();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [AppComponent],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(AppComponent);
    router.events.pipe(takeUntil(destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          expect(event.urlAfterRedirects).toEqual('/user');
        }
      }
    });
  }));

  afterEach(() => {
    destroy$.next();
    destroy$.complete();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'trackr'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('trackr');
  });
});
