import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  /**
   * User info
   */
  private _user: User;

  /**
   * User language
   */
  private _language: string;

  /**
   * Check if the user is logged
   */
  private _isUserLoggedObs: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
  }

  /**
   * Check if the User is logged
   * Return an Observable with true if the user is logged, false is not logged.
   */
  public isUserLogged(): Observable<boolean> {
    return this._isUserLoggedObs.asObservable();
  }

  /**
   * Set User login
   * @param isLogged: true is correctly logged; false is not properly logged.
   */
  public setUserLogged(isLogged: boolean) {
    this._isUserLoggedObs.next(isLogged);
  }

  /**
   * Set User info
   * @param user data
   */
  public setUser(user: any) {
    if (user) {
      this._user = {
        email: user.email,
        token: user.token,
        id: user._id
      };
    } else {
      this._user = null;
    }
    this.setUserLogged(user ? true : false);
  }

  /**
   * Get User info
   */
  public getUser(): User {
    return this._user;
  }

  /**
   * Get User email
   */
  public getUserEmail(): string {
    return this._user ? this._user.email : null;
  }

  /**
   * Get User login Token
   */
  public getUserToken(): string {
    return this._user ? this._user.token : null;
  }

  /**
   * Get User ID
   */
  public getUserId(): string {
    return this._user ? this._user.id : null;
  }

  public get language(): string {
    return this._language;
  }

  public set language(value: string) {
    this._language = value;
  }

}
