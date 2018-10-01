import { Injectable } from '@angular/core';
import { RestClient } from './rest-client';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RequestMethod } from '@angular/http';
import { IEntity } from './models/ientity';
import { environment } from '../../environments/environment';
import { Observable } from "rxjs/Observable";

@Injectable()
@ResourceParams({
    url: environment.baseUrl + 'entity'
})
export class EntityService extends RestClient {
    entitiesList: Array<IEntity> = null;

    @ResourceAction({
        isArray: true,
    })
    list: ResourceMethod<any, IEntity[]>;

    getListEntities(): Observable<IEntity[]> {
        return Observable.create(observer => {
            if (this.entitiesList !== null) {
                observer.next(this.entitiesList);
            } else {
                this.list().$observable.subscribe((data: Array<IEntity>) => {
                    this.entitiesList = data;
                    observer.next(this.entitiesList);
                });
            }
        });
    }

    @ResourceAction({
        method: RequestMethod.Post
    })
    save: ResourceMethod<IEntity, any>;

    @ResourceAction({
        method: RequestMethod.Put
    })
    add: ResourceMethod<IEntity, any>;
}
