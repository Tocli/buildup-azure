import { Injectable } from '@angular/core';
import { RestClient } from './rest-client';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RequestMethod } from '@angular/http';
import { IProjectWeather } from './models/iproject-weather';
import { environment } from '../../environments/environment';

@Injectable()
@ResourceParams({
    url: environment.baseUrl + 'projectweatherservice'
})
export class ProjectWeatherService extends RestClient {

    @ResourceAction({
        isArray: true,
    })
    list: ResourceMethod<any, IProjectWeather[]>;

    @ResourceAction({
        path: '/{!id}'
    })
    get: ResourceMethod<{ id: any }, IProjectWeather>;

    @ResourceAction({
        method: RequestMethod.Post
    })
    save: ResourceMethod<IProjectWeather, any>;

    @ResourceAction({
        method: RequestMethod.Put
    })
    add: ResourceMethod<IProjectWeather, any>;

    @ResourceAction({
        method: RequestMethod.Delete,
        path: '/{!id}'
    })
    delete: ResourceMethod<{ id: any }, any>;

}