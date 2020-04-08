import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { endpoints } from '../shared/constants/endpoints.constant';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Execute user registration
   * @param user
   */
  signup(user: User): Observable<any> {
    return this.httpClient.post("http://localhost:8000/users/signup", user);
  }

}
 