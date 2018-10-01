import { Injectable } from '@angular/core';
import { RestClient } from './rest-client';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RequestMethod } from '@angular/http';
import { IProjectLocation } from './models/iproject-location';
import { environment } from '../../environments/environment';
import {ILocationData} from './models/ilocationdata';

@Injectable()
@ResourceParams({
    url: environment.baseUrl + 'projectlocation'
})
export class ProjectLocationService extends RestClient {

    @ResourceAction({
        isArray: true,
    })
    list: ResourceMethod<any, IProjectLocation[]>;

    @ResourceAction({
        path: '/{!id}'
    })
    get: ResourceMethod<{ id: any }, IProjectLocation>;

    @ResourceAction({
        method: RequestMethod.Post
    })
    save: ResourceMethod<IProjectLocation, any>;

    @ResourceAction({
        method: RequestMethod.Put
    })
    add: ResourceMethod<IProjectLocation, any>;
}
