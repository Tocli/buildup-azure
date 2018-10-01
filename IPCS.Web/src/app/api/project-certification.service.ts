import {Injectable} from '@angular/core';
import {RestClient} from './rest-client';
import {Resource, ResourceParams, ResourceAction} from 'ngx-resource';
import {ResourceMethod} from 'ngx-resource/src/Interfaces';
import {RequestMethod} from '@angular/http';
import {IProjectCertification} from './models/iproject-certification';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs';

@Injectable()
@ResourceParams({
  url: environment.baseUrl + 'projectcertification'
})
export class ProjectCertificationService extends RestClient {

  @ResourceAction({
    method: RequestMethod.Post
  })
  save: ResourceMethod<IProjectCertification, any>;

  @ResourceAction({
    method: RequestMethod.Put
  })
  add: ResourceMethod<IProjectCertification, any>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/{!id}'
  })
  delete: ResourceMethod<{ id: any }, any>;

  @ResourceAction({
    isArray: true,
    path: '/{!projectId}/certification'
  })
  listCertification: ResourceMethod<{ projectId: any }, IProjectCertification[]>;

}
