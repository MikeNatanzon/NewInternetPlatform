import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PipeModule } from './pipes/pipe.module';
import { LabelsPipe } from './pipes/labels/labels.pipe';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { HeadersInterceptor } from './interceptors/headers.interceptor';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';
import { ErrorHttpInterceptor } from './interceptors/error-http.interceptor';

import { UserInfoService } from './services/user-info.service';
import { LoggedGuardService } from './services/logged-guard.service';
import { LoaderService } from './services/loader.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PipeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHttpInterceptor,
      multi: true,
      deps: [UserInfoService, LabelsPipe]
    },
    UserInfoService,
    LoggedGuardService,
    LoaderService
  ]
})
export class SharedModule {

}
