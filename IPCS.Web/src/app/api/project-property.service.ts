import { Injectable } from '@angular/core';
import { RestClient } from './rest-client';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RequestMethod } from '@angular/http';
import { IProjectProperty } from './models/iproject-property';
import { environment } from '../../environments/environment';

@Injectable()
@ResourceParams({
    url: environment.baseUrl + 'projectproperty'
})
export class ProjectPropertyService extends RestClient {

    @ResourceAction({
        isArray: true,
    })
    list: ResourceMethod<any, IProjectProperty[]>;

    @ResourceAction({
        path: '/{!id}'
    })
    get: ResourceMethod<{ id: any }, IProjectProperty>;

    @ResourceAction({
        method: RequestMethod.Post
    })
    save: ResourceMethod<IProjectProperty, any>;

    @ResourceAction({
        method: RequestMethod.Put
    })
    add: ResourceMethod<IProjectProperty, any>;

    @ResourceAction({
        method: RequestMethod.Delete,
        path: '/{!id}'
    })
    delete: ResourceMethod<{ id: any }, any>;

}