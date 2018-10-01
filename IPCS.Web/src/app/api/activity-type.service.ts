import { Injectable } from '@angular/core';
import { RestClient } from './rest-client';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RequestMethod } from '@angular/http';
import { IActivityType } from './models/iactivity-type';
import { environment } from '../../environments/environment';

@Injectable()
@ResourceParams({
    url: environment.baseUrl + 'activitytype'
})
export class ActivityTypeService extends RestClient {

    @ResourceAction({
        isArray: true,
    })
    list: ResourceMethod<any, IActivityType[]>;

    @ResourceAction({
        path: '/{!id}'
    })
    get: ResourceMethod<{ id: any }, IActivityType>;

    @ResourceAction({
        method: RequestMethod.Post
    })
    save: ResourceMethod<IActivityType, any>;

    @ResourceAction({
        method: RequestMethod.Put
    })
    add: ResourceMethod<IActivityType, any>;

    @ResourceAction({
        method: RequestMethod.Delete,
        path: '/{!id}'
    })
    delete: ResourceMethod<{ id: any }, any>;

}
