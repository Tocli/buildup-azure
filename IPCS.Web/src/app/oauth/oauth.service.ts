import {Injectable, EventEmitter, OnInit} from '@angular/core';
import {SessionStorage, SessionStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Resource, ResourceParams, ResourceAction, ResourceActionBase} from 'ngx-resource';
import {ResourceMethod} from 'ngx-resource/src/Interfaces';
import {RequestMethod, Http, Request, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {CookieService} from 'ngx-cookie';

export interface IUserProfile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  readonly userName: string;
}

interface ITokenRequest {
  grant_type: string;
  client_id: string;
  client_secret: string,
  username: string;
  password: string,
  scope: string;
}

interface IToken {
  access_token: string;
  expires_in: string;
  token_type;
  refresh_token: string;
}


@Injectable()
@ResourceParams({
  url: environment.oauthUrl + 'connect/'
})
export class OAuthService extends Resource implements OnInit {

  static instance: OAuthService;

  private statusObservable: Observable<boolean>;

  private statusSubject: Rx.Subject<boolean> = new Rx.Subject<boolean>();

  subjectProfile: Rx.Subject<IUserProfile> = new Rx.Subject<IUserProfile>();

  readonly REMEMBER_ME_COOKIE: string = 'remember';

  readonly EMAIL_COOKIE: string = 'email';

  @SessionStorage()
  private static token: IToken;

  @SessionStorage()
  private static clientToken: IToken;

  @SessionStorage()
  public static userProfile: IUserProfile;

  public static isRefreshing = false;

  @SessionStorage('dailyReportSaved')
  private saved;

  static isTakeUserToken(): boolean {
    return OAuthService.token !== null;
  }

  static getAccessToken(): string {
    if (OAuthService.token) {
      return OAuthService.token.access_token;
    }

    if (OAuthService.clientToken) {
      return OAuthService.clientToken.access_token;
    }
    return '';
  }

  static getUserProfile() {
    return OAuthService.userProfile;
  }

  static saveUserProfile(userProfile: IUserProfile) {
    this.userProfile = userProfile;
    OAuthService.instance.subjectProfile.next(this.userProfile);
  }

  static getClientToken(http: Http): Observable<any> {

    const observable: Observable<any> = new Observable(observer => {
      const param = new URLSearchParams();
      param.append('grant_type', 'client_credentials');
      param.append('client_id', 'clientId');
      param.append('client_secret', 'secret');
      param.append('scope', 'ipcsApi');

      const headers: Headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');

      http.post(environment.oauthUrl + 'connect/token', param.toString(), {headers})
        .subscribe((data: Response) => {
            OAuthService.clientToken = <IToken>data.json();
            observer.next(OAuthService.clientToken);
          },
          (error: Response) => {
            console.log(error.json());
            observer.error(error.json());
          });
    });

    return observable;

  }

  static refreshToken(http: Http): Observable<any> {
    OAuthService.isRefreshing = true;
    return Observable.create((observer) => {
      const param = new URLSearchParams();
      param.append('grant_type', 'refresh_token');
      param.append('client_id', 'clientId');
      param.append('client_secret', 'secret');
      param.append('refresh_token', OAuthService.token.refresh_token);
      param.append('scope', 'ipcsApi');
      const headers: Headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');
      http.post(environment.oauthUrl + 'connect/token', param.toString(), {headers})
        .subscribe(
          (data: Response) => {
            OAuthService.isRefreshing = false;
            OAuthService.token = <IToken>data.json();
            observer.next(<IToken>data.json());
          },
          (error: Response) => {
            OAuthService.isRefreshing = false;
            if (error.status === 400) {
              OAuthService.instance.logout();
            }
            // observer.error(error.json());
          });

    });

  }

  static addObserverProfile(): Observable<IUserProfile> {
    return OAuthService.instance.subjectProfile.asObservable();
  }

  constructor(private router: Router,
              private sessionStorageService: SessionStorageService,
              protected http: Http,
              private cookieService: CookieService) {
    super(http);
    OAuthService.instance = this;
  }

  ngOnInit() {

  }


  getStatusObservable(): Observable<boolean> {
    if (!this.statusObservable) {
      this.statusObservable = Observable.from(this.statusSubject);
    }
    return this.statusObservable;
  }

  isLoggedIn(): boolean {
    const token = OAuthService.token;
    return token !== null;
  }

  isRememberMe(): boolean {
    return this.cookieService.get(this.REMEMBER_ME_COOKIE) === 'true';
  }

  emailRemember(): string {
    let email = '';
    if (this.isRememberMe()) {
      email = this.cookieService.get(this.EMAIL_COOKIE);
    }
    return email;
  }

  login(email: string, password: string, remember: boolean): Observable<any> {
    if (remember) {
      this.cookieService.put(this.REMEMBER_ME_COOKIE, 'true');
      this.cookieService.put(this.EMAIL_COOKIE, email);
    } else {
      this.cookieService.removeAll();
    }
    const observable: Observable<any> = new Observable(observer => {
      const param = new URLSearchParams();
      param.append('grant_type', 'password');
      param.append('client_id', 'clientId');
      param.append('client_secret', 'secret');
      param.append('username', email);
      param.append('password', password);
      param.append('scope', 'offline_access');

      const headers: Headers = new Headers();
      headers.append('content-type', 'application/x-www-form-urlencoded');

      this.http.post(environment.oauthUrl + 'connect/token', param.toString(), {headers})
        .subscribe((data: Response) => {
            // login ok
            OAuthService.token = <IToken>data.json();
            observer.next();
          },
          (error: Response) => {
            const errorJson = error.json();
            if (errorJson.error_description === 'invalid_username_or_password') {
              errorJson.error_description = 'Login failed. Invalid username or password';
            }
            observer.error(errorJson);

          });
    });

    return observable;
  }

  clearStorage() {
    OAuthService.userProfile = null;
    OAuthService.token = null;
    this.statusSubject.next(false);
  }

  logout() {
    /*this.dailyReportViewService.isSaved().then(() => {
      this.clearStorage();
      this.statusSubject.next(false);
      this.router.navigate(['/login']);
    }, () => {

    });*/
    if(this.router.url.indexOf('dailyreport') === -1)
    {
      this.clearStorage();
    }
    this.router.navigate(['/login']);
  }

}
