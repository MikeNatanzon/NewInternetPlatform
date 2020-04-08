import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserInfoService } from '../services/user-info.service';
import { LabelsPipe } from '../pipes/labels/labels.pipe';
import { CommonLabels } from '../labels/common.labels';

/**
 * Intercept HTTP errors
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHttpInterceptor {

  commonLabels: object;

  constructor(
    protected userInfoService: UserInfoService,
    private labelsPipe: LabelsPipe,
  ) {
    this.commonLabels = CommonLabels;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error) {
    let errorMessage = '';
    if (error instanceof HttpErrorResponse) {
      const message = error.error && error.error.errors && error.error.errors.message;
      errorMessage = `${this.labelsPipe.transform('errorDotPoint', 'LABELS', this.userInfoService.language, this.commonLabels)}
       ${ message || this.labelsPipe.transform('genericServiceError', 'LABELS', this.userInfoService.language, this.commonLabels)}`;
    } else {
      errorMessage = `${this.labelsPipe.transform('errorCodeDotPoint', 'LABELS', this.userInfoService.language, this.commonLabels)}
       ${error.status}\n${this.labelsPipe.transform('messageDotPoint', 'LABELS', this.userInfoService.language, this.commonLabels)}
       ${error.message || this.labelsPipe.transform('genericServiceError', 'LABELS', this.userInfoService.language, this.commonLabels)}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
