import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OAuthService } from '../../../oauth/oauth.service';
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { SessionStorage,SessionStorageService } from 'ngx-webstorage';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports:[RouterTestingModule],
      declarations: [ LoginComponent ],
      providers: [OAuthService,SessionStorageService,{ provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
