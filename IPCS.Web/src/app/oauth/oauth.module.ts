import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanActivteOAuthGuardService } from './can-activte-oauth-guard.service';
import { OAuthService } from './oauth.service';
import { CanActivteService } from './can-activte.service';
import { ResourceModule } from 'ngx-resource';
import { AccountService } from '../api/account-service.service';
import { CookieService } from 'ngx-cookie';

@NgModule({
  imports: [
    CommonModule,
    ResourceModule.forRoot()
  ],
  declarations: [],
  providers: [CanActivteOAuthGuardService, OAuthService, CanActivteService,AccountService,CookieService],
  exports:[]
})
export class OauthModule { }
