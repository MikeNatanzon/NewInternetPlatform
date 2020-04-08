
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../shared/components/base/base.component';
import { UserInfoService } from '../shared/services/user-info.service';
import { LoginService } from './login.service';
import { LabelsPipe } from '../shared/pipes/labels/labels.pipe';
import { LoginLabels } from './login.labels';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Utils } from '../shared/utils/Utils';

import { first } from 'rxjs/operators';
import { FlashMessagesService } from 'angular2-flash-messages';

/**
 * User login page
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent extends BaseComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject<void>();

  loginForm: FormGroup;

  pswIcon = faEyeSlash;

  pswType: string = 'password';

  msgErrorService: string = '';

  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    protected userInfoService: UserInfoService,
    private loginService: LoginService,
    private labelsPipe: LabelsPipe,
    private flashMessage: FlashMessagesService
  ) {
    super(userInfoService);
  }

  ngOnInit() {
    this.labelsFile = LoginLabels;

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      updateOn: 'blur'
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.unsubscribe.unsubscribe();
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  /**
   * Do login user
   */
  onSubmit(): void {

    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value)
        .pipe(first())
            .subscribe(
              data => {
                  this.flashMessage.show('You are logged in', {cssClass: 'alert-success', timeout: 3000});
                  this.router.navigate(['/dashboard']);
                
            },
              error => {
                this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      });
    
    } else {
     this.flashMessage.show('Invalid Form - Incorrect Field(s)', {cssClass: 'alert-danger', timeout: 3000});    
    }
  }

  switchPsw(): void {
    this.pswType === 'text' ? this.pswType = 'password' : this.pswType = 'text';
    this.pswIcon === faEyeSlash ? this.pswIcon = faEye : this.pswIcon = faEyeSlash;
  }

  forgotPassword(): void {
    // TODO Implement forgot password
  }

}