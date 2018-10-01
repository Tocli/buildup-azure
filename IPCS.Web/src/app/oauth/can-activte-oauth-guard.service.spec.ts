import { TestBed, inject } from '@angular/core/testing';
import { OAuthService } from './oauth.service';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from '@angular/router';
import { CanActivteOAuthGuardService } from './can-activte-oauth-guard.service';
import { SessionStorage,SessionStorageService } from 'ngx-webstorage';

describe('CanActivteOAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports:[RouterTestingModule],
      providers: [CanActivteOAuthGuardService,SessionStorageService,OAuthService,{ provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }]
    });
  });

  it('should be created', inject([CanActivteOAuthGuardService], (service: CanActivteOAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
