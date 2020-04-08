import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../shared/components/base/base.component';
import { ModalComponent } from '../shared/components/modal/modal.component';
import { UserInfoService } from '../shared/services/user-info.service';
import { LabelsPipe } from '../shared/pipes/labels/labels.pipe';
import { SignupLabels } from './signup.labels';
import { SignupService } from './signup.service';
import { takeUntil } from 'rxjs/operators';
import { Utils} from '../shared/utils/Utils';
import { faEye, faEyeSlash, faCheck, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { MustMatchValidation } from '../shared/validators/must-match.validator';
import { ModalConfig } from '../shared/models/modal-config';

import { FlashMessagesService } from 'angular2-flash-messages';
import { first } from 'rxjs/operators';


/**
 * User registration page
 */
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [SignupService]
})
export class SignupComponent extends BaseComponent implements OnInit, OnDestroy {

  private unsubscribe: Subject<void> = new Subject<void>();
  signupForm: FormGroup;
  pswIcon: IconDefinition = faEyeSlash;
  pswType: string = 'password';
  msgErrorService: string = '';

  @ViewChild('registerationModal', { static: false }) private registrationModal: ModalComponent;

  registerationModalOptions: ModalConfig;

  constructor(
    protected router: Router,
    private formBuilder: FormBuilder,
    protected userInfoService: UserInfoService,
    private modalService: NgbModal,
    private signupService: SignupService,
    private labelsPipe: LabelsPipe,
    private flashMessage: FlashMessagesService
  ) {
    super(userInfoService);
  }

  ngOnInit() {
    this.labelsFile = SignupLabels;

    this.registerationModalOptions = {
      id: 'registerationModal',
        title: this.labelsPipe.transform('registrationModal', 'LABELS', this.language, this.labelsFile),
        description: this.labelsPipe.transform('descriptionModal', 'LABELS', this.language, this.labelsFile),
        icon:  faCheck,
        iconColor: 'text-success',
        okButtonLabel: this.labelsPipe.transform('okButtonModal', 'LABELS', this.language, this.labelsFile),
        okButtonClick: this.goToLogin,
        closeButtonClick:  this.goToLogin,
    };

    // Set registration requirements
    this.signupForm = this.formBuilder.group({
      firstName: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(45), Validators.pattern(Utils.CHARSET_NAME_REGEX)],
        updateOn: 'blur'
      }),
      lastName: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(45), Validators.pattern(Utils.CHARSET_NAME_REGEX)],
        updateOn: 'blur'
      }),
      username: new FormControl('', { // TODO Add unique validator
        validators: [Validators.required, Validators.minLength(6), Validators.maxLength(16),Validators.pattern(Utils.CHARSET_NAME_REGEX)],
        updateOn: 'blur'
      }),
      email: new FormControl('', { // TODO Add unique validator
        validators: [Validators.required, Validators.email, Validators.pattern(Utils.CHARSET_EMAIL_REGEX)],
        updateOn: 'blur'
      }),
      password: ['', [Validators.required, Validators.pattern(Utils.CHARSET_PASSWORD_REGEX)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: MustMatchValidation('password', 'confirmPassword')
    });

  }

  checkPasswords(group: FormGroup): void {
    const password = group.controls.password.value;
    const confirmPassword = group.controls.confirmPassword.value;
    if (password === confirmPassword) {
      group.get('confirmPassword').setErrors(null);
    } else {
      group.get('confirmPassword').setErrors({notMatch: true});
    }
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.unsubscribe.unsubscribe();
  }

  switchPsw(): void {
    this.pswType === 'text' ? this.pswType = 'password' : this.pswType = 'text';
    this.pswIcon === faEyeSlash ? this.pswIcon = faEye : this.pswIcon = faEyeSlash;
  }

  /**
   * Register a new User
   */
  onSubmit(): void {
      if(this.signupForm.valid)
      {
            this.signupService.signup(this.signupForm.value)
              .pipe(first())
                  .subscribe(
                    data => {
                      this.flashMessage.show('You are now registered', {cssClass: 'alert-success', timeout: 3000});
                      this.router.navigate(['/login']);
                  },
                    error => {
                      this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
                      

                    this.router.navigate(['/signup']);
            });
      }else
      {
        this.flashMessage.show('Invalid Form - Incorrect Field(s)', {cssClass: 'alert-danger', timeout: 3000});
      }
  }

  onReset(): void {
    this.signupForm.reset();
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }

  get firstName(): AbstractControl {
    return this.signupForm.get('firstName');
  }

  get lastName() {
    return this.signupForm.get('lastName');
  }

  get username(): AbstractControl {
    return this.signupForm.get('username');
  }

  get email(): AbstractControl {
    return this.signupForm.get('email');
  }

  get password(): AbstractControl {
    return this.signupForm.get('password');
  }

  get confirmPassword(): AbstractControl {
    return this.signupForm.get('confirmPassword');
  }

}