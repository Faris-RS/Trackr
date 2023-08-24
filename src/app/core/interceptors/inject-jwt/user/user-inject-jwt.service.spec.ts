import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { UserInjectJwtService } from './user-inject-jwt.service';

describe('UserInjectJwtService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let interceptor: UserInjectJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserInjectJwtService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UserInjectJwtService,
          multi: true,
        },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(UserInjectJwtService);
  });

  it('should add Authorization header with token for non-excluded URLs', () => {
    const token = 'fakeUserToken';
    const testUrl = '/api/data';
    spyOn(localStorage, 'getItem').and.returnValue(token);
    httpClient.get(testUrl).subscribe();
    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
  });

  it('should not add Authorization header for excluded URLs', () => {
    const excludedUrls = ['/login', '/signup'];
    excludedUrls.forEach((url) => {
      httpClient.get(url).subscribe();
      const req = httpTestingController.expectOne(url);
      expect(req.request.headers.has('Authorization')).toBeFalsy();
    });
  });

  it('should handle requests without user token', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    httpClient.get('/api/data').subscribe();
    const req = httpTestingController.expectOne('/api/data');
    expect(req.request.headers.has('Authorization')).toBeFalsy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
