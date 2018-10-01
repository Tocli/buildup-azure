import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { OAuthService } from './oauth.service';
import { Router } from '@angular/router';

@Injectable()
export class CanActivteOAuthGuardService implements CanActivate{

  constructor(private oauthService:OAuthService,private router: Router) { }

  canActivate():boolean {
    var isLoggedIn = this.oauthService.isLoggedIn();

    if(!isLoggedIn){
        this.router.navigate(['/login']);
    }

    return isLoggedIn;
  }

}
