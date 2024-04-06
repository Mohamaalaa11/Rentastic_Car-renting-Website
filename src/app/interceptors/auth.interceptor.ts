import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const excludedUrls = [
      'https://accept.paymob.com/api/auth/tokens',
      'https://accept.paymob.com/api/ecommerce/orders',
      'https://accept.paymob.com/api/acceptance/payment_keys',
    ];

    const excludeAuthHeader = excludedUrls.some((url) =>
      req.url.startsWith(url)
    );

    const token = localStorage.getItem('token');
    const newReq = excludeAuthHeader
      ? req // Do not add Authorization header
      : req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });

    return next.handle(newReq);
  }
}
