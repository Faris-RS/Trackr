import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService implements HttpInterceptor {
  constructor(private router: Router, private toast: HotToastService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Error 400
        if (error.status === 400) {
          this.router.navigate(['/login']);
          this.toast.error('please log in');
        }

        // Error 401
        else if (error.status === 401) {
          this.router.navigate(['/login']);
          this.toast.error('please log in');
        }

        // Error 402
        else if (error.status === 402) {
          this.router.navigate(['/login']);
          this.toast.error('please log in');
        }

        // Error 403
        else if (error.status === 403) {
          this.router.navigate(['/login']);
          this.toast.error('please log in');
        }

        // Error 404
        else if (error.status === 404) {
          this.router.navigate(['/login']);
          this.toast.error('Invalid Route');
        } else {
          this.toast.error('Something went wrong. Please try again later.');
        }

        return throwError(
          () => new Error('Something went wrong. Please try again later.')
        );
      })
    );
  }
}
