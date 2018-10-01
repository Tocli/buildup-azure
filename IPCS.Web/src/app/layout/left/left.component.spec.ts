import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OAuthService } from '../../oauth/oauth.service';
import { Router } from '@angular/router';
import { LeftComponent } from './left.component';
import { RouterTestingModule } from "@angular/router/testing";
import { SessionStorage,SessionStorageService } from 'ngx-webstorage';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



describe('LeftComponent', () => {
  let component: LeftComponent;
  let fixture: ComponentFixture<LeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports:[RouterTestingModule],
      declarations: [ LeftComponent ],
      providers: [ SessionStorageService,OAuthService,
      { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } } ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
