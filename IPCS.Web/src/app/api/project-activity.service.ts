import { Injectable } from '@angular/core';
import { RestClient } from './rest-client';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RequestMethod } from '@angular/http';
import { IProjectActivity } from './models/iproject-activity';
import { environment } from '../../environments/environment';


@Injectable()
@ResourceParams({
    url: environment.baseUrl + 'projectactivity'
})
export class ProjectActivityService extends RestClient {

    @ResourceAction({
        isArray: true,
    })
    list: ResourceMethod<any, IProjectActivity[]>;

    @ResourceAction({
        path: '/{!id}'
    })
    get: ResourceMethod<{ id: any }, IProjectActivity>;

    @ResourceAction({
        method: RequestMethod.Post
    })
    save: ResourceMethod<IProjectActivity, any>;

    @ResourceAction({
        method: RequestMethod.Put
    })
    add: ResourceMethod<IProjectActivity, any>;

    @ResourceAction({
        method: RequestMethod.Delete,
        path: '/{!id}'
    })
    delete: ResourceMethod<{ id: any }, any>;
}
