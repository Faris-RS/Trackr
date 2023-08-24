import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AdminInjectJwtService } from './admin-inject-jwt.service';

describe('AdminInjectJwtService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let interceptor: AdminInjectJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AdminInjectJwtService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AdminInjectJwtService,
          multi: true,
        },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(AdminInjectJwtService);
  });

  it('should add Authorization header with token for non-excluded URLs', () => {
    const token = 'fakeAdminToken';
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

  it('should handle requests without admin token', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    httpClient.get('/api/data').subscribe();
    const req = httpTestingController.expectOne('/api/data');
    expect(req.request.headers.has('Authorization')).toBeFalsy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
