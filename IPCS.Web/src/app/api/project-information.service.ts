import {Injectable} from '@angular/core';
import {RestClient} from './rest-client';
import {Resource, ResourceParams, ResourceAction} from 'ngx-resource';
import {ResourceMethod} from 'ngx-resource/src/Interfaces';
import {RequestMethod} from '@angular/http';
import {IProjectInformation} from './models/iproject-information';
import {IProjectInformationRequestModel} from './models/iproject-information-request-model';
import {IPaginatorResponseModel} from './models/ipaginator-response-model';
import {environment} from '../../environments/environment';
import {IProjectDashBoardResponseModel} from './models/iproject-dash-board-response-model';

@Injectable()
@ResourceParams({
  url: environment.baseUrl + 'projectinformation'
})
export class ProjectInformationService extends RestClient {

  @ResourceAction({
    path: '/projectlist',
    method: RequestMethod.Post
  })
  list: ResourceMethod<IProjectInformationRequestModel, IPaginatorResponseModel>;

  @ResourceAction({
    path: '/{!id}'
  })
  get: ResourceMethod<{ id: any }, IProjectInformation>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  save: ResourceMethod<IProjectInformation, any>;

  @ResourceAction({
    method: RequestMethod.Put
  })
  new: ResourceMethod<IProjectInformation, any>;

  @ResourceAction({
    method: RequestMethod.Put
  })
  add: ResourceMethod<IProjectInformation, any>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!id}'
  })
  delete: ResourceMethod<{ id: any }, any>;

  @ResourceAction({
    path: '/deleteProject/{!id}',
    method: RequestMethod.Post
  })
  deleteProjects: ResourceMethod<{ id: any }, any>;

  @ResourceAction({
    method: RequestMethod.Get,
    path: '/{!id}/dashboard'
  })
  getDashBoard: ResourceMethod<{ id: any }, IProjectInformation>;

    @ResourceAction({
      method: RequestMethod.Post,
      path: '/updateRetainedAmount/{id}/{retainedAmount}'
    })
    updateRatainedAmount: ResourceMethod<{projectId: number, retainedAmount: number}, any>;

  @ResourceAction({
    method: RequestMethod.Post,
    path: '/updateLastModify/{id}/{lastModify}'
  })
  updateLastModify: ResourceMethod<{projectId: number, lastModify: number}, any>;
}
