import { Injectable } from '@angular/core';
import { RestClient } from './rest-client';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RequestMethod } from '@angular/http';
import { IProjectStatus } from './models/iproject-status';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs/Observable';

@Injectable()
@ResourceParams({
    url: environment.baseUrl + 'projectstatus'
})
export class ProjectStatusService extends RestClient {

    private statuses: IProjectStatus[] = null;

    @ResourceAction({
        isArray: true,
        cache: true
    })
    listAll: ResourceMethod<any, IProjectStatus[]>;

    @ResourceAction({
        path: '/{!id}'
    })
    get: ResourceMethod<{ id: any }, IProjectStatus>;

    @ResourceAction({
        method: RequestMethod.Post
    })
    save: ResourceMethod<IProjectStatus, any>;

    @ResourceAction({
        method: RequestMethod.Put
    })
    add: ResourceMethod<IProjectStatus, any>;

    @ResourceAction({
        method: RequestMethod.Delete,
        path: '/{!id}'
    })
    delete: ResourceMethod<{ id: any }, any>;

    list(): Observable<IProjectStatus[]> {
      return Observable.create((observer) => {
        if (this.statuses === null) {
          this.listAll().$observable.subscribe((result: IProjectStatus[]) => {
            this.statuses = result;
            observer.next(this.statuses);
          });
        } else {
          observer.next(this.statuses);
        }

      });

    }

}
