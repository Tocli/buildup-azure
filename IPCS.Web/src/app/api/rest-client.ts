import {Observable} from 'rxjs/Observable';
import {Http, Request} from '@angular/http';
import {environment} from '../../environments/environment';
import {Resource, ResourceParams, ResourceAction, ResourceMethod, ResourceActionBase} from 'ngx-resource';
import {OAuthService} from '../oauth/oauth.service';
import 'rxjs/Rx';

export abstract class RestClient extends Resource {

  static pendingRequest: Map<any, any> = new Map<any, any>();

  $requestInterceptor(req: Request, methodOptions?: ResourceActionBase): Request {
    return super.$requestInterceptor(req, methodOptions);
  }

  $getHeaders(methodOptions: any): any {
    const headers = super.$getHeaders();
    headers['Cache-control'] = 'no-cache';
    headers['Cache-control'] = 'no-store';
    headers['Expires'] = '0';
    headers['Pragma'] = 'no-cache';
    if (!methodOptions.noAuth) {
      headers['Authorization'] = 'Bearer ' + OAuthService.getAccessToken();
    }

    return headers;
  }

  reSendRequest(token: any) {
    const request = RestClient.pendingRequest;
    request.forEach((i, k) => {
      k.headers.set('Authorization', 'Bearer ' + token.access_token);
      this.http.request(k).subscribe(res => {
          i.next(res.text() ? res.json() : {});
        },
        (error) => {
          this.manageErrors(i, error);
        });
    });

    RestClient.pendingRequest = new Map<any, any>();
  }

  manageErrors(subscriber: any, error: any) {
    if (this.isJson(error.text().toString())) {
      const errorJson: any = error.json();
      if (errorJson.value) {
        subscriber.error(errorJson.value);
      }
      subscriber.error(errorJson);
    } else {
      subscriber.error(error.text());
    }

  }

  $responseInterceptor(observable: Observable<any>, req: Request, methodOptions?: ResourceActionBase): Observable<any> {
    return Observable.create((subscriber) => {
      observable.subscribe((res: Response) => {
        subscriber.next(res.text() ? res.json() : {});
      }, (error: Response) => {
        if (error.status === 401) {
          RestClient.pendingRequest.set(req, subscriber);
          if (OAuthService.isTakeUserToken()) {
            if (!OAuthService.isRefreshing) {
              OAuthService.refreshToken(this.http).subscribe(token => {
                this.reSendRequest(token);
              });
            }
          } else {
            OAuthService.getClientToken(this.http).subscribe(token => {
              this.reSendRequest(token);
            });
          }
        } else if ((error.status === 400 || error.status === 500) && error.text()) {
          this.manageErrors(subscriber, error);
        } else {
          subscriber.error();
        }
      });
    });

  }

  private isJson(json: string): boolean {
    try {
      JSON.parse(json);
    } catch (e) {
      return false;
    }
    return true;
  }

}
