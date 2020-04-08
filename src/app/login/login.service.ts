import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { endpoints } from '../shared/constants/endpoints.constant';

import { Userlog } from '../models/userlog';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Execute login user
   * @param userlog
   */
  login(userlog: Userlog): Observable<any> {
    return this.httpClient.post("http://localhost:8000/users/login", userlog);
  }

}