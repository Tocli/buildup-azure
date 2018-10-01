import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { OAuthService } from '../../oauth/oauth.service';
import { CanActivteService } from '../../oauth/can-activte.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactivateAccountComponent } from './reactivate-account/reactivate-account.component';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {EqualValidatorModule} from '../../directives/validators/equal-validator.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password/forgot-password.component';
import {BusyModule} from 'angular2-busy';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { FormattersModule } from '../../directives/formatters/formatters.module';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { ModalModule} from 'ngx-bootstrap';
import {PrivacyAndTermsComponent} from '../privacy-and-terms/privacy-and-terms.component';

@NgModule({
  imports: [
    CommonModule,
    SecurityRoutingModule,
    EqualValidatorModule,
    BrowserModule,
    FormsModule,
    BusyModule,
    BrowserAnimationsModule,
    FormattersModule,
    ReCaptchaModule,
    ModalModule.forRoot(),
  ],
  providers: [CanActivteService, OAuthService],
  declarations: [LoginComponent, SignUpComponent, ReactivateAccountComponent, SetNewPasswordComponent, ForgotPasswordComponent, ActivateAccountComponent, PrivacyAndTermsComponent],
  exports:[SetNewPasswordComponent]
})
export class SecurityModule { }
