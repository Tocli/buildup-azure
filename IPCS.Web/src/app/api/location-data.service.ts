import { Injectable } from '@angular/core';
import {RestClient} from "./rest-client";
import {ResourceParams, ResourceAction} from "ngx-resource";
import {ResourceMethod} from 'ngx-resource/src/Interfaces';
import {environment} from "../../environments/environment";
import {ICountry} from "./models/icountry";
import {IState} from "./models/istate";
import {ICity} from "./models/icity";

@Injectable()
@ResourceParams({
  url: environment.baseUrl + 'locationdata'
})
export class LocationDataService extends RestClient{

  @ResourceAction({
    isArray: true,
    path: '/countries'
  })
  listCountries: ResourceMethod<any, ICountry[]>;

  @ResourceAction({
    isArray: true,
    path: '/{!countryCode}/states'
  })
  listStates: ResourceMethod<{countryCode:string}, IState[]>;

  @ResourceAction({
    isArray: true,
    path: '/{!stateCode}/cities'
  })
  listCities: ResourceMethod<{stateCode:string}, ICity[]>;

}
