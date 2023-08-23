import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInjectJwtService implements HttpInterceptor {
  intercept<T>(
    request: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    if (this.shouldExcludeUrl(request.url)) {
      return next.handle(request);
    }

    const token = localStorage.getItem('userToken');

    if (token) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(authRequest);
    }
    return next.handle(request);
  }

  private shouldExcludeUrl(url: string): boolean {
    const excludedUrls = ['/login', '/signup'];
    return excludedUrls.some((excludedUrl) => url.includes(excludedUrl));
  }
}
