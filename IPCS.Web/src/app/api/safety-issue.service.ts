import { Injectable } from '@angular/core';
import { RestClient } from './rest-client';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RequestMethod } from '@angular/http';
import { IProjectWeather } from './models/iproject-weather';
import { environment } from '../../environments/environment';
import {ISafetyIssue} from './models/isafety-issue';
import {Observable} from 'rxjs/Observable';

@Injectable()
@ResourceParams({
    url: environment.baseUrl + 'safetyissue'
})
export class SafetyIssueService extends RestClient {

    listSafetys: ISafetyIssue[];

    @ResourceAction({
        isArray: true,
    })
    list: ResourceMethod<any, ISafetyIssue[]>;

    @ResourceAction({
        path: '/{!id}'
    })
    get: ResourceMethod<{ id: any }, ISafetyIssue>;

    @ResourceAction({
        method: RequestMethod.Post
    })
    save: ResourceMethod<ISafetyIssue, any>;

    @ResourceAction({
        method: RequestMethod.Put
    })
    add: ResourceMethod<ISafetyIssue, any>;

    @ResourceAction({
        method: RequestMethod.Delete,
        path: '/{!id}'
    })
    delete: ResourceMethod<{ id: any }, any>;

    listAll(): Observable<ISafetyIssue[]> {
      return Observable.create((observer) => {
        if (!this.listSafetys) {
          this.list().$observable.subscribe((result: ISafetyIssue[]) => {
            this.listSafetys = result;
            observer.next(this.listSafetys);
          });
        } else {
          observer.next(this.listSafetys);
        }
      });
    }
}
