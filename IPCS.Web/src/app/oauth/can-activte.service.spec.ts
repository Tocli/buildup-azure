import { TestBed, inject } from '@angular/core/testing';
import { OAuthService } from './oauth.service';
import { CanActivteService } from './can-activte.service';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from '@angular/router';
import { SessionStorage,SessionStorageService } from 'ngx-webstorage';

describe('CanActivteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports:[RouterTestingModule],
      providers: [CanActivteService,SessionStorageService,OAuthService,{ provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }]
    });
  });

  it('should be created', inject([CanActivteService], (service: CanActivteService) => {
    expect(service).toBeTruthy();
  }));
});
