import { Injectable } from '@angular/core';
import { RestClient } from './rest-client';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RequestMethod } from '@angular/http';
import { IProjectOrder } from './models/iproject-order';
import { environment } from '../../environments/environment';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
@ResourceParams({
    url: environment.baseUrl + 'projectorder'
})
export class ProjectOrderService extends RestClient{

  @ResourceAction({
    isArray: true,
  })
  list: ResourceMethod<any, IProjectOrder[]>;

  @ResourceAction({
    path: '/{!id}'
  })
  get: ResourceMethod<{ id: any }, IProjectOrder>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  save: ResourceMethod<IProjectOrder, any>;

  @ResourceAction({
    method: RequestMethod.Put
  })
  add: ResourceMethod<IProjectOrder, any>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!id}'
  })
  delete: ResourceMethod<{ id: any }, any>;

  @ResourceAction({
    isArray: true,
    path: '/{!projectId}/order'
  })
  listOrder: ResourceMethod<{ projectId: any }, IProjectOrder[]>;

}
