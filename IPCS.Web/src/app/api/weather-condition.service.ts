import { Injectable } from '@angular/core';
import { RestClient } from './rest-client';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RequestMethod } from '@angular/http';
import { IProjectWeather } from './models/iproject-weather';
import { environment } from '../../environments/environment';
import {IWhaterCondition} from './models/iweather-condition';
import {Observable} from 'rxjs/Observable';

@Injectable()
@ResourceParams({
    url: environment.baseUrl + 'weathercondition'
})
export class WeatherConditionService extends RestClient {

    listConditions: IWhaterCondition[];

    @ResourceAction({
        isArray: true,
    })
    list: ResourceMethod<any, IWhaterCondition[]>;

    @ResourceAction({
        path: '/{!id}'
    })
    get: ResourceMethod<{ id: any }, IWhaterCondition>;

    @ResourceAction({
        method: RequestMethod.Post
    })
    save: ResourceMethod<IWhaterCondition, any>;

    @ResourceAction({
        method: RequestMethod.Put
    })
    add: ResourceMethod<IWhaterCondition, any>;

    @ResourceAction({
        method: RequestMethod.Delete,
        path: '/{!id}'
    })
    delete: ResourceMethod<{ id: any }, any>;

  listAll(): Observable<IWhaterCondition[]> {
    return Observable.create((observer) => {
      if (!this.listConditions) {
        this.list().$observable.subscribe((result: IWhaterCondition[]) => {
          this.listConditions = result;
          observer.next(this.listConditions);
        });
      } else {
        observer.next(this.listConditions);
      }
    });
  }

}
