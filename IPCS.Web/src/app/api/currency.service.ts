import { Injectable } from '@angular/core';
import { RestClient } from './rest-client';
import { Resource, ResourceParams, ResourceAction } from 'ngx-resource';
import { ResourceMethod } from 'ngx-resource/src/Interfaces';
import { RequestMethod } from '@angular/http';
import { ICurrency } from './models/icurrency';
import { environment } from '../../environments/environment';
import {SessionStorage, SessionStorageService} from 'ngx-webstorage';
import {Observable} from 'rxjs/Observable';

@Injectable()
@ResourceParams({
  url: environment.baseUrl + 'currency'
})
export class CurrencyService extends RestClient{

  //@SessionStorage()
  currencyList: Array<ICurrency> = null;

  @ResourceAction({
    isArray: true,
  })
  list: ResourceMethod<any, ICurrency[]>;

  getListCurrency():Observable<ICurrency[]>{

    return Observable.create(observer => {
      if(this.currencyList !== null){
        observer.next(this.currencyList);
      } else {
        this.list().$observable.subscribe((data:Array<ICurrency>)=>{
          this.currencyList = data;
          observer.next(this.currencyList);
        });
      }
    });

  }

  @ResourceAction({
    method: RequestMethod.Put
  })
  add: ResourceMethod<ICurrency, any>;

  @ResourceAction({
    method: RequestMethod.Get
  })
  get: ResourceMethod<any, ICurrency>;


}
