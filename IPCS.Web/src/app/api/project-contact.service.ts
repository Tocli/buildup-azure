import { Injectable } from '@angular/core';
import { RestClient } from './rest-client';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RequestMethod } from '@angular/http';
import { IProjectContact } from './models/iproject-contact';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import {Observable} from "rxjs";

@Injectable()
@ResourceParams({
    url: environment.baseUrl + 'projectcontact'
})
export class ProjectContactService extends RestClient {

    @ResourceAction({
        method: RequestMethod.Post
    })
    save: ResourceMethod<IProjectContact, any>;

    @ResourceAction({
        method: RequestMethod.Put
    })
    add: ResourceMethod<IProjectContact, any>;

    @ResourceAction({
        method: RequestMethod.Delete,
        path: '/{!id}'
    })
    delete: ResourceMethod<{ id: any }, any>;

    @ResourceAction({
        isArray: true,
        path: '/{!projectId}/contact'
    })
    listContact: ResourceMethod<{ projectId: any }, IProjectContact[]>;

}
