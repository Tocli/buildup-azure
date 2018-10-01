import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionStorage,SessionStorageService } from 'ngx-webstorage';

import { OAuthService } from './oauth.service';

describe('OAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [RouterTestingModule],
      providers: [OAuthService,SessionStorageService]
    });
  });

  it('should be created', inject([OAuthService], (service: OAuthService) => {
    expect(service).toBeTruthy();
  }));
});
