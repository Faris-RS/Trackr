import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService implements HttpInterceptor {
  constructor(private router: Router, private toast: HotToastService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<ApiResponse<any>>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status >= 400 && error.status < 600) {
          if (error.status === 401) {
            this.toast.error('Please login to perform this action');
          } else {
            this.router.navigate(['/error']);
            this.toast.error('An error occurred. Please try again later.');
          }
        }
        return throwError('An error occurred. Please try again later.');
      })
    );
  }
}
