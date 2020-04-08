import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfoService } from '../services/user-info.service';

/**
 * Add HTTP request headers
 */
@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private userInfoService: UserInfoService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const token = this.userInfoService.getUserToken();
    if (token) {
      headers = headers.append('Authorization', 'Token ' + token);
    }

    const newRequest = request.clone({
      headers
    });

    return next.handle(newRequest);
  }

}
