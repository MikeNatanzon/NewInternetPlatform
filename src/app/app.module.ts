import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';
import { LoggedModule } from './private/logged.module';

import { AppComponent } from './app.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { LoginComponent } from './login/login.component';
import { NipHeaderComponent } from './nip-header/nip-header.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { SignupService } from './signup/signup.service';
import { LoginService } from './login/login.service';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    ModalComponent,
    LoaderComponent,
    LoginComponent,
    NipHeaderComponent,
    SignupComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgbModule,
    SharedModule,
    LoggedModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [SignupService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
